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


## Endpoints

### GET GetTokenWSFE
Recibir Token para el servicio de Factura Electrónica AFIP

```bash
127.0.0.1:5000/invoices/auth
```
### GET GetTokenPadronA4
Recibir Token para el servicio de Padrón A4 AFIP

```bash
127.0.0.1:5000/clients/auth
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```

### POST postInvoice
Solicitar al WS de Factura Electrónica el Código de Autorización Electrónica (CAE) y registrar datos de factura en la base de datos.
```bash
127.0.0.1:5000/invoices/invoice
```

#### Request Headers:
```bash
x-access-token: tokenJWT
```

#### Body urlencoded:
```bash
Token: tokenWSFE
Sign: SignWSFE
Cuit: ADMIN_CUIT
ptoVenta: Punto de Venta (Integer)
tipoCbte: Segun Listado Tipo Comprobante (Integer)
concepto: Integer: 1 (Productos) - 2 (Servicios)
docTipo: Segun Listado (Integer)
docNro: Integer
cbteFech: 'AAAAMMDD'
impTotal: Double
detalle: [Array]
```

### POST newClient
Solicitar datos de cliente con WS de PadronA4 y registrarlo en la base de datos de clientes.
```bash
127.0.0.1:5000/clients/new
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```
#### Body urlencoded:
```bash
token: TokenPadronA4
sign: SignPadronA4
Cuit: ADMIN_CUIT
idPersona: docClient (Integer)
telefono: Long
email: email
condicionIva: String
```

### GET getAllClients
Recuperar todos los clientes cargados en la base de datos de Clientes
```bash
127.0.0.1:5000/clients/
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```

### GET getClient
Buscar Cliente por CUIT o por Razon Social en la base de datos de Clientes
```bash
127.0.0.1:5000/clients/find?cuit
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```
####Query Params
```bash
razonSocial
cuit
```
### DEL deleteClient
Eliminar un cliente de la base de datos.
```bash
127.0.0.1:5000/clients/:cuit
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```
#### Path Variables
```bash
cuit: 
```
### GET getAllInvoices
Ver listado de facturas emitidas por la API.
```bash
127.0.0.1:5000/invoices/
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```

### GET getTypesDocs
Ver Listado por Código de Tipos de Documento (ej: 86 - CUIT)
```bash
127.0.0.1:5000/typesdocs
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```

### GET getTypesComp
Ver Listado por Código de Tipos de Comprobantes. (ej: 11 - Factura C)
```bash
127.0.0.1:5000/comprobantes
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```
### GET loginUser
Autenticación de usuario
```bash
127.0.0.1:5000/auth/login
```

#### Body urlencoded:
```bash
email
password
```
### GET GetAllUsers
Ver Listado de usuarios registrados.
```bash
127.0.0.1:5000/users
```

#### Request Headers:
```bash
x-access-token: tokenJWT
```

### POST createUser
Registrar Usuario
```bash
127.0.0.1:5000/users
```

#### Request Headers:
```bash
x-access-token: tokenJWT
```
### Body urlencoded

```bash
email
password
permissionLevel: 7 = admin, 1 = guest
```

### DEL deleteUser
Eliminar un usuario
```bash
127.0.0.1:5000/users/:email
```
#### Request Headers:
```bash
x-access-token: tokenJWT
```

#### Path Variables 
```bash
email
```



"# Factura Electrónica" 


