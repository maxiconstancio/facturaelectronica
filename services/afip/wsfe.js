import soap from 'soap';
const url =  "https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL";

export const FECompUltimoAutorizado = async (auth, ptoVenta, cbteTipo) => {

    

    let args = {Auth: auth, PtoVta: ptoVenta, CbteTipo: cbteTipo }


    try {
        let client = await soap.createClientAsync(url);
        let result = await client.FECompUltimoAutorizadoAsync(args);
      
        
        return (result[0].FECompUltimoAutorizadoResult.CbteNro);
      
      } catch (error) {
        return(error);
        
      }

}

export const FECAESolicitar = async  (data) => {
  

    const auth = data.Auth;

    const FECAEDetRequest = { Concepto: data.Concepto, DocTipo: data.DocTipo, 
      DocNro: data.DocNro, CbteDesde: data.Cbte, CbteHasta: data.Cbte, CbteFch: data.CbteFech, ImpTotal: data.ImpTotal, ImpTotConc:0.00,
      ImpNeto:data.ImpTotal,
      ImpOpEx:0,
      ImpTrib:0,
      ImpIVA:0,
      MonId:"PES",
      MonCotiz:1
      }
    let args =  {Auth: auth, FeCAEReq: {FeCabReq: { CantReg: 1, PtoVta: data.ptoVenta, CbteTipo: data.cbteTipo}, FeDetReq: { FECAEDetRequest: FECAEDetRequest }}};
     
     try {
        let client = await soap.createClientAsync(url);
        let result = await client.FECAESolicitarAsync(args);
      
        
      
        return(result);
      
      } catch (error) {
        return(error);
        
      }
}


export const ListarComprobantes = async ( auth) => {

  try {
    
    let client = await soap.createClientAsync(url);
    let result = await client.FEParamGetTiposCbteAsync(auth);
    
    return result
  } catch (error) {
    
  }
}


export const ListarTiposDoc = async ( auth) => {

  try {
    
    let client = await soap.createClientAsync(url);
    let result = await client.FEParamGetTiposDocAsync(auth);
    
    return result
  } catch (error) {
    
  }
}

export const ListarPtoVenta = async ( auth) => {

  try {
    
    let client = await soap.createClientAsync(url);
    let result = await client.FEParamGetPtosVentaAsync(auth);
    
    return result
  } catch (error) {
    
  }
}