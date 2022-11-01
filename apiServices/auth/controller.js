import bcrypt from "bcryptjs";
import jwt from "../../services/jwt/index.js";
import Users from "../../users/models.js";

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({email});
        
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = await jwt.createToken(user.id, user.permissionLevel);
                res.status(200).json({response:'User Authenticated',token });
            } else {
                res.status(403).json("Password Incorrect")
            };
        } else {
            res.status(404).json("User not exist");
        }
        
    } catch (error) {
        return res.status(500).json('Error'+ error);
    }
}