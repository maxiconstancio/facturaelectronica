#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import fs from "fs";
 import app from "../app.js";
import mongoose from "mongoose";
import findAdmin from "./initialSetup.js";

 import { createServer } from "http";
import path from "path";
 

/**
*  Database Connection
*/
const databaseConnect = async () => {
 try {
   await mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   console.log("Database connected");
 } catch (error) {
   return console.log("Database error", error);
 }
}

 /**
  * Normalize a port into a number, string, or false.
  */
 
  const normalizePort = (val) => {
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 /**
  * Event listener for HTTP server "error" event.
  */
 
  const onError = (error) => {
   if (error.syscall !== "listen") {
     throw error;
   }
 
   const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case "EACCES":
       console.error(bind + " requires elevated privileges");
       process.exit(1);
       break;
     case "EADDRINUSE":
       console.error(bind + " is already in use");
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  * Database Connect
  * FindOrCreate Admin
  */
 
 const onListening = async() => {
   const addr = server.address();
   const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
   await databaseConnect();
  await findAdmin();
   console.log("Listening on " + bind);
 }
 
 /**
  * Get port from environment and store in Express.
  */
 
 const port = normalizePort(process.env.PORT || "5000");
 app.set("port", port);
 
 /**
  * Create HTTP server.
  */
 
 const server = createServer(app);
export  const pem = fs.readFileSync(path.resolve()+process.env.FILE_PEM, "utf-8");
export const key = fs.readFileSync(path.resolve()+process.env.FILE_KEY, "utf-8");

 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on("error", onError);
 server.on("listening", onListening);
 

 export default mongoose;
