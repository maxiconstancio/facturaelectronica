import { FECAESolicitar, FECompUltimoAutorizado } from "../services/afip/wsfe.js";

export const getInvoice = async(req, res, next) => {
    
    const cuit = process.env.CUIT;
    const body = req.body;
        
        const comp = await FECompUltimoAutorizado({Token: body.Token, Sign: body.Sign, Cuit: cuit}, body.ptoVenta, body.tipoCbte) + 1
        const data = { Auth: {Token: body.Token, Sign: body.Sign, Cuit: cuit}, 
        ptoVenta: body.ptoVenta,
        cbteTipo: body.tipoCbte, 
        Concepto: body.concepto, 
        DocTipo: body.docTipo, 
        DocNro: body.docNro, 
        Cbte: comp, 
        CbteFech: body.cbteFech, 
        ImpTotal: body.impTotal};
       try {
        const CAEResult = await FECAESolicitar(data);
        
        if (CAEResult[0].FECAESolicitarResult.hasOwnProperty('Errors')) {
            return (res.status(500).json(CAEResult[0].FECAESolicitarResult.Errors.Err))
        } else {    
            
            req.CAE = CAEResult[0].FECAESolicitarResult.FeDetResp.FECAEDetResponse[0].CAE
            
        req.data = data; 
        return( next()); 
        }

           
       } catch (error) {
            res.json('error al solicitar CAE' + error)
       }
        
}