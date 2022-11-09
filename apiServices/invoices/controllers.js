import wsaa from '../../services/afip/wsaa.js';
import Invoice from './model.js';
import Clients from "../clients/model.js";

export const getWsaa = async (req, res, next) =>  {
    try {
        
        res.json( await wsaa('wsfe'));
    } catch (error) {
        res.status(500).json(error)
    }
}

export const registerInvoice = async (req, res) => {

    try {
        const env = process.env;
        const data = req.data
        const dataUser = {razonSocial: env.RAZON_SOCIAL, Cuit: env.CUIT, domicilio: env.DOMICILIO, iva: env.IVA, IIBB: env.IIBB, inicio: env.INICIO_ACTIVIDAD }
        const client = await Clients.findOne({cuit: data.DocNro});
        
        const newInvoice = await Invoice.create({
            concepto: data.Concepto,
            docTipo: data.DocTipo,
            docNro: data.DocNro,
            cbteTipo: data.cbteTipo,
            ptoVenta: data.ptoVenta,
            comprobante: data.Cbte,
            fechaComprobante: data.CbteFech,
            importeNeto: data.ImpTotal,
            importeTotal: data.ImpTotal,
            detalle: req.body.detalle,
            CAE: req.CAE
        })
        
        const invoice = {
            concepto: newInvoice.concepto,
            cbteTipo: newInvoice.cbteTipo,
            ptoVenta: newInvoice.ptoVenta,
            comprobante:  newInvoice.comprobante,
            fechaComprobante: newInvoice.fechaComprobante,
            importeNeto: newInvoice.importeNeto,
            importeTotal: newInvoice.importeTotal,
            detalle: newInvoice.detalle,
            CAE:  newInvoice.CAE
        }
        
        return res.status(200).json({dataUser, client, invoice})
        
       //return res.status(200).json(data)
    } catch (error) {
        res.status(500).json('error al registrar la factura'+ error )
    }

}

export const getAll = async (req, res) =>{

    try {
        const query = req.query
        const allInvoices = await Invoice.find(query);
        return(res.status(200).json(allInvoices));
    } catch (error) {
        return (res.status(500).json('Error' +  error) )
    }
}



