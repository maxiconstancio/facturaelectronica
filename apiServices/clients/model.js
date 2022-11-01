import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 
 * Clients Model
 * 
 *
 *
 */
const Clients = new Schema({
  cuit: {
    type: String,
    required: true,
    
  },
  direccion: {
    type: String,
    required: true,
  },
  
  provincia: {
    type: String,
    required: true,
  },
  
  localidad: {
    type: String,
    required: true,
  },
  
  direccion: {
    type: String,
    required: true,
  },
  
  razonSocial: {
    type: String,
    required: true,
  },
});

export default mongoose.model("clients", Clients);