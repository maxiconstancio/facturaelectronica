import wsaa from "../../services/afip/wsaa.js";
import { FECAESolicitar, FECompUltimoAutorizado } from "../../services/afip/wsfe.js";

export const getWsaa = async (req, res, next) =>  {
    try {
        res.json( await wsaa('wsfe'));
    } catch (error) {
        res.status(500).json('error')
    }
}

export const getInvoice = async (req, res, next) =>  {
    try {
        const body = req.body;
        const auth = { Token: [body.Token], Sign: body.Sign, Cuit: body.Cuit};
        const ptoVenta = body.ptoVenta;
        const tipoCbte = body.tipoCbte;
        const Concepto = body.concepto;
        const DocTipo = body.docTipo;
        const DocNro = body.docNro;
        const CbteFech = body.cbteFech;
        const impTotal = body.impTotal;
        
        const ultComp = ( await FECompUltimoAutorizado(auth, ptoVenta, tipoCbte)).FECompUltimoAutorizadoResult.CbteNro + 1 ;
        
        res.json(await FECAESolicitar(auth, ptoVenta, tipoCbte, Concepto,DocTipo, DocNro, ultComp, CbteFech, impTotal ))        

    } catch (error) {
        res.status(500).json(error)
    }
}

