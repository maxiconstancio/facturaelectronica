import wsaa from "../services/afip/wsaa.js";

import { getPerson } from "../services/afip/ws_sr_padron_a4.js";

const CUIT = process.env.CUIT;
export const getWsaa = async (req, res, next) =>  {
    try {
        res.json( await wsaa('ws_sr_padron_a4'));
    } catch (error) {
        res.status(500).json(error)
    }
}



export const getPersona = async (req, res, next) => {
    
    
    try {
        const body = req.body;
        
        const data = { token: body.token, sign: body.sign, cuitRepresentada: CUIT, idPersona: body.idPersona};
        
        const result = await (getPerson(data));
       
        if(typeof(result[0]) === 'object') {
        //Si no es objeto es un error    
        req.client = result;
        next()
        } else {
            res.status(result.response.status).json(result.response.data)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    

}
