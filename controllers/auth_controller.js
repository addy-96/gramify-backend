import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppErrors from "../core/error.js";

import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
    const accessToken = jwt.sign(
        {id: user._id, username: user.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );

    const refreshToken = jwt.sign(
        {id: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )

    return {accessToken, refreshToken};
};

export const register = async (req,res) => {
    try {
        const { email, password, username } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User already exists" });
        const bcryptRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, bcryptRounds); 
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username
        });
        const { accessToken, refreshToken } = generateToken(newUser);
        await User.findByIdAndUpdate( newUser._id, {
            refreshToken
        });
        res.status(201).json({
            msg: "User registered",
            id: newUser._id,
            email: newUser.email,
            username: username,
            followers: newUser.followers.length,
            following: newUser.following.length,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (err) {
        AppErrors.handleServerError(err, res);
    }
};

export const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)  return res.status(400).json({msg: "Invalid credentials"});

        const {accessToken, refreshToken} = generateToken(user);
        
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }catch(err){
        AppErrors.handleServerError(err,res);
    }
};

export const refresh = async (req,res) => {
    try{
        const authHeader = req.get('Authorization');
        
        if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({msg: "No refresh token provided"});

        const refreshToken = authHeader.split(' ')[1];
        
        const user = await User.findOne({refreshToken: refreshToken});

        if(!user) return res.status(403).json({msg: "Invalid refresh token, try loggin in."});

         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
         if (err || user._id.toString() !== decoded.id)
                return res.status(403).json({ msg: "Token verification failed" });

            const accessToken = jwt.sign(
                { id: user._id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    });
    }catch(err){
        AppErrors.handleServerError(err,res);
    }
}