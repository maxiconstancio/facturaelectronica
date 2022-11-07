
import Users from '../apiServices/users/model.js';
import Comprobantes from '../apiServices/typesInvoice/model.js'

import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { ListarComprobantes, ListarPtoVenta } from '../services/afip/wsfe.js';
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
  // const auth = await wsaa('wsfe');
  const auth = {
    Token: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJDTj13c2ZlLCBPPUFGSVAsIEM9QVIiIHVuaXF1ZV9pZD0iMzEzMzYxNzQxNyIgZ2VuX3RpbWU9IjE2Njc3ODEzOTAiIGV4cF90aW1lPSIxNjY3ODI0NjUwIi8+CiAgICA8b3BlcmF0aW9uIHR5cGU9ImxvZ2luIiB2YWx1ZT0iZ3JhbnRlZCI+CiAgICAgICAgPGxvZ2luIGVudGl0eT0iMzM2OTM0NTAyMzkiIHNlcnZpY2U9IndzZmUiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjAzMzc3Mjk4MzYsIENOPXBydWViYSIgYXV0aG1ldGhvZD0iY21zIiByZWdtZXRob2Q9IjIyIj4KICAgICAgICAgICAgPHJlbGF0aW9ucz4KICAgICAgICAgICAgICAgIDxyZWxhdGlvbiBrZXk9IjIwMzM3NzI5ODM2IiByZWx0eXBlPSI0Ii8+CiAgICAgICAgICAgIDwvcmVsYXRpb25zPgogICAgICAgIDwvbG9naW4+CiAgICA8L29wZXJhdGlvbj4KPC9zc28+Cg==',
    Sign: 'N4fWRg/dz4Kw/nYisJIR4UqvFDu8I0nj2XptBx9jtaHldPSNfUjl6CjkjLd3pNO75b0ijszRx6L7czykk+tPvvK9hoxHtwnJ3QSJFhfZiUXHLDCgkBHSUVy3oHnnC4o5q+8BGtZjzWDhqALhsxl7useHcnW+bSM5rxWZLBJhTbk=',
    Cuit: '20337729836'
  }
  const getComprobantes = await ListarComprobantes({Auth: auth});

  
  const tiposCbte = getComprobantes[0].FEParamGetTiposCbteResult.ResultGet.CbteTipo

  try {
      await Comprobantes.insertMany(tiposCbte)
  } catch (error) {
    console.log('error al insertar tipos de comprobantes')
  }
  console.log(await ListarPtoVenta({Auth: auth}))
};


export default findAdmin;