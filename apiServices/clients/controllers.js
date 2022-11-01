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

export default createClient