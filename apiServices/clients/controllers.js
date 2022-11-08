import { dummy } from "../../services/afip/ws_sr_padron_a4.js";
import Clients from "./model.js";
export async function createClient(req, res)  {

    try {
        const client = req.client[0].personaReturn.persona
        const infoContact = req.body;

        
        
        const userFound = await Clients.findOne({ cuit: client.idPersona });
        
      
        if (userFound) {
            return res.status(409).json("Client Already Exist");
        }
        const newClient = await Clients.create({
          cuit: client.idPersona,
          razonSocial: client.razonSocial,
          condicionIva: infoContact.condicionIva,
          direccion: client.domicilio[0].direccion,
          localidad: client.domicilio[0].localidad,
          provincia: client.domicilio[0].descripcionProvincia,
          telefono: infoContact.telefono,
          email: infoContact.email
        });
        return res.status(200).json(`Client ${newClient.razonSocial} Created Successfully`);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

export async function getAllClients(req, res){

    try {
      const allClients = await Clients.find();
      res.status(200).json(allClients)  
    } catch (error) {
      res.status(500).json(error)
    }
    
}


export async function findClient(req, res){
  
  try {
  
  const client = await Clients.findOne(req.query);
    res.status(200).json(client)  
  } catch (error) {
    res.status(500).json(error)
  }
  
}


export async function delClient (req, res) {
  const client = req.params.cuit
  const userFound = await Clients.findOne({ cuit: client });
  try {
    
  if (!userFound) {
    res.json(401).json('Client not found')
  } else {
    await Clients.deleteOne({cuit: client})
    res.status(204).json('client deleted successfully')
  }  
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getStatus (req, res) {

  try {
      dummy
      res.status(200).json('Service OK');

  } catch (error) {
    res.status(500).json('service unavailable');
  }

}