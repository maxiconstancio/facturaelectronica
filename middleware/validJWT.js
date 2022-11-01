import jwt from "../utils/jwt.js";

const validJWT = async (req, res, next) => {
    

    try {
        if (!req.headers['x-access-token']) return res.status(403).json("Access denied");
        const token = req.headers['x-access-token'];
        const userLogged = await jwt.verifyToken(token);
        req.user = userLogged.id;
        req.permissionLevel = userLogged.permissionLevel
        console.log(req.permissionLevel)
        return next(); 

    } catch (error) {
        return res.status(500).json("Error" + error);
    }
    
}

export default validJWT;

