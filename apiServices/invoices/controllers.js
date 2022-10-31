import wsaa from "../../services/afip/wsaa.js";
import { FECAESolicitar, FECompUltimoAutorizado } from "../../services/afip/wsfe.js";


export const getWsaa = async (req, res, next) =>  {
    try {
        
        res.json( await wsaa('wsfe'));
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getInvoice = async(req, res, next) => {

    
    const body = req.body;
        const comp = await FECompUltimoAutorizado({Token: body.Token, Sign: body.Sign, Cuit: body.Cuit}, body.ptoVenta, body.tipoCbte) + 1
        const data = { Auth: {Token: body.Token, Sign: body.Sign, Cuit: body.Cuit}, 
        ptoVenta: body.ptoVenta, 
        cbteTipo: body.tipoCbte, 
        Concepto: body.concepto, 
        DocTipo: body.docTipo, 
        DocNro: body.docNro, 
        Cbte: comp, 
        CbteFech: body.cbteFech, 
        ImpTotal: body.impTotal};
       try {
        res.status(200).json(await FECAESolicitar(data));    
       } catch (error) {
            res.json(error)
       }
        
}