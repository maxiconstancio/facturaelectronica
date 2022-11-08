# Factura Electrónica

API que consume los servicios de AFIP de WSAA (certificados digitales), WSFE (Factura Electrónica) y PadronA4(padrón de contribuyentes) mediante SOAP con NodeJS, en principio en los entornos de homologación (testing) para luego ponerlos en produccion.

La API Rest realizada en nodeJS con express, MongoDB, autenticacion con JWT. Todavia en desarrollo.


## Envinroment setup


1) Copy .env.example to .env and fill with database credentials and Files PEM and KEY

To install dependencies, run
``` bash
npm install
```


## Start local server

``` bash
npm start
```


# Endpoints

## GET GetTokenWSFE
Recibir Token para el servicio de Factura Electrónica AFIP

```bash
127.0.0.1:5000/invoices/auth
```
## GET GetTokenPadronA4
Recibir Token para el servicio de Padrón A4 AFIP

```bash
127.0.0.1:5000/clients/auth
```
### Request Headers
```bash
x-access-token: tokenJWT
```



"# Factura Electrónica" 


