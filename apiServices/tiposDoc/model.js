import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 
 * Comprobantes Model
 * 
 *
 *
 */
const TypesDoc = new Schema({
  Id: {
    type: Number,
    required: true,
    
  },
  Desc: {
    type: String,
    required: true,
  },
  
  FchDesde: {
    type: String,
    required: true,
  },
  
  FchHasta: {
    type: String,
    required: false,
  },
  
});

export default mongoose.model("typesDoc", TypesDoc);
