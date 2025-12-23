import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppErrors from "../core/error.js";

const bycryptRounds = 10;

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
    try{
        const {email,password} = req.body;
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password,bycryptRounds);
        const newUser = await User.create({email: email, password: hashedPassword});

        res.status(201).json({message: "User registered",user: newUser.username});
    }catch (err){
        AppErrors.handleServerError(err,res);
    }
};

export const login = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)  return res.status(400).json({message: "Invalid credentials"});

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
        
        if(!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({message: "No refresh tokenprovided"});

        const refreshToken = authHeader.spilit(' ')[1];
        
        const user = await User.find({refreshToken});

        if(!user) return res.status(403).json({message: "Invalid refresh token"});

          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
         if (err || user._id.toString() !== decoded.id)
                return res.status(403).json({ message: "Token verification failed" });

            const accessToken = jwt.sign(
                { id: user._id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.json({ accessToken });
    });
    }catch(err){
        AppErrors.handleServerError(err,res);
    }
}

// TODO: To write logout