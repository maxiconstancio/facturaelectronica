
const isAuthorized = (role) => {
    return async (req, res, next) => {
        
        if (!req?.permissionLevel) return res.sendStatus(401);
        
        return (req.permissionLevel == role) ? next() :  res.sendStatus(401);
        
        
    }
}

export default isAuthorized;