import soap from 'soap';
const url =  "https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL";

export const FECompUltimoAutorizado = async (auth, ptoVenta, cbteTipo) => {

    

    let args = {Auth: auth, PtoVta: ptoVenta, CbteTipo: cbteTipo }


    try {
        let client = await soap.createClientAsync(url);
        let result = await client.FECompUltimoAutorizadoAsync(args);
      
        
      
        return (result[0]);
      
      } catch (error) {
        return(error);
        
      }

}

export const FECAESolicitar = async  (auth, ptoVenta, cbteTipo, Concepto, DocTipo, DocNro, Cbte, CbteFech, ImpTotal) => {

    
    let args =  {Auth: auth, FeCAEReq: {FeCabReq: { CantReg: 1, PtoVta: ptoVenta, CbteTipo: cbteTipo}, FeDetReq: { FECAEDetRequest: { Concepto: Concepto, DocTipo: DocTipo, 
    DocNro: DocNro, CbteDesde: Cbte, CbteHasta: Cbte, CbteFch: CbteFech, ImpTotal: ImpTotal, ImpTotConc:0.00,
    ImpNeto:ImpTotal,
    ImpOpEx:0,
    ImpTrib:0,
    ImpIVA:0,
    MonId:"PES",
    MonCotiz:1
    } }}};
    try {
        let client = await soap.createClientAsync(url);
        let result = await client.FECAESolicitarAsync(args);
      
        
      
        return( result[0].FECAESolicitarResult);
      
      } catch (error) {
        console.log(error);
        
      }
}

