
import Users from '../apiServices/users/model.js';
import Comprobantes from '../apiServices/typesInvoice/model.js'
import TypesDoc from '../apiServices/tiposDoc/model.js'
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { ListarComprobantes, ListarDocs } from '../services/afip/wsfe.js';
import wsaa from '../services/afip/wsaa.js';
config()



const findAdmin = async () => {
  // check for an existing admin user
  


  const userFound = await Users.findOne({ email: process.env.USER_ADMIN });

  if (userFound) return;

  // create a new admin user
  const newUser = await Users.create({
    email: process.env.USER_ADMIN,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,10),
    permissionLevel: 7,
  });
  
  console.log(`new user created: ${newUser.email}`);
  const auth = await wsaa('wsfe');

  const getComprobantes = await ListarComprobantes({Auth: auth});

  
  const tiposCbte = getComprobantes[0].FEParamGetTiposCbteResult.ResultGet.CbteTipo

  try {
      await Comprobantes.insertMany(tiposCbte)
  } catch (error) {
    console.log('error al insertar tipos de comprobantes')
  }
  const getDocs = await ListarDocs({Auth: auth});
  const tiposDoc = getDocs[0].FEParamGetTiposDocResult.ResultGet.DocTipo
  try {
    await TypesDoc.insertMany(tiposDoc);
  } catch (error) {
    console.log('error al insertar tipos de comprobantes')
  }
};


export default findAdmin;