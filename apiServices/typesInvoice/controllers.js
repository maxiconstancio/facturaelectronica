import Comprobantes from './model.js'

export const getAll = async (req, res) =>{

    try {
        
        const allInvoices = await Comprobantes.find();
        return(res.status(200).json(allInvoices));
    } catch (error) {
        return (res.status(500).json('Error' +  error) )
    }
}
