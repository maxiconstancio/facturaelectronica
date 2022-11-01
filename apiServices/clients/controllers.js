import Clients from "./model.js";
export async function createClient(req, res)  {

    try {
        const client = req.client[0].personaReturn.persona
        
        const userFound = await Clients.findOne({ cuit: client.idPersona });
        
      
        if (userFound) {
            return res.status(409).json("Client Already Exist");
        }
        console.log(client.domicilio)
        const newClient = await Clients.create({
          cuit: client.idPersona,
          razonSocial: client.razonSocial,
          direccion: client.domicilio[0].direccion,
          localidad: client.domicilio[0].localidad,
          provincia: client.domicilio[0].descripcionProvincia
        });
        console.log(newClient)
        return res.status(200).json(`Client ${newClient.razonSocial} Created Successfully`);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

export default createClient