
const isAuthorized = (role = 2) => {
    return async (req, res, next) => {
        
        if (!req?.permissionLevel) return res.sendStatus(401);
        
        if (role == 2) {
            return (req.permissionLevel == 7) ? next() :  res.sendStatus(401);    
        } else {
            return  next();       
        }
        
        
        
    }
}

export default isAuthorized;