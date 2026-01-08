import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err){
            console.log(err);
            return res.status(403).json({ msg: `Forbidden: ${err.message}` });
        } 
        req.user = decoded;
        next();
    });
};
