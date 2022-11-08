import { FECAESolicitar, FECompUltimoAutorizado } from "../services/afip/wsfe.js";

const CUIT = process.env.CUIT;
export const getInvoice = async(req, res, next) => {

    
    const body = req.body;
        const comp = await FECompUltimoAutorizado({Token: body.Token, Sign: body.Sign, Cuit: CUIT}, body.ptoVenta, body.tipoCbte) + 1
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