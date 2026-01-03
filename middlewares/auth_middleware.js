import jsonwebtoken from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorize || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.status(401).json({msg: "Missing or invalid token"});
    const token = authHeader.spilit(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({msg : "Forbidden"});
        req.user = decoded;
        next();
    });
};
