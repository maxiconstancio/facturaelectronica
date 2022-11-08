import soap from "soap";

import xml2js from "xml2js";
import { key, pem } from "../../bin/www.js";
import { addTimeExp, getDateAfip } from "../../utils/dates.js";
import { config } from 'dotenv';
config();

const CUIT = process.env.CUIT;

import { createCms } from "./config/TRA.js";


let url = process.env.URL_WSAA;

const wsaa = async (_service) => {
  
  const now = new Date();
  const isoDate = await getDateAfip(now);
  
  let expTime = new Date();
  
  expTime = await addTimeExp(expTime);
  
  const TRA =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    "<loginTicketRequest>" +
    "<header>" +
    "<uniqueId>89779000</uniqueId>" +
    "<generationTime>" +
    isoDate +
    "</generationTime>" +
    "<expirationTime>" +
    expTime +
    "</expirationTime>" +
    "</header>" +
    "<service>" +
    _service +
    "</service>" +
    "</loginTicketRequest>";
  
  let cms = await createCms(pem, key, TRA);
  
  let args = { in0: cms.replaceAll("\r\n", "") };
 
  
  
  try {
    
    let client = await soap.createClientAsync(url);
    let result = await client.loginCmsAsync(args);
    
    const resultObj = await new Promise ((resolve, reject) =>  xml2js.Parser().parseString(result[0].loginCmsReturn, (error, res) => {
      if (error) reject (error);
      else {
        
        const token = (res.loginTicketResponse.credentials[0].token);
        const sign = (res.loginTicketResponse.credentials[0].sign[0]);
      resolve ({Token: token[0], Sign: sign, Cuit: CUIT});
      }
      
    }))
    
    return resultObj;
  
  } catch (error) {
    if (error) {
      return {error};
    }
  }
  

}

export default wsaa;