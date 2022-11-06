import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 
 * Clients Model
 * 
 *
 *
 * oncepto: data.Concepto, DocTipo: data.DocTipo, 
      DocNro: data.DocNro, CbteDesde: data.Cbte, CbteHasta: data.Cbte, CbteFch: data.CbteFech, ImpTotal: data.ImpTotal, ImpTotConc:0.00,
      ImpNeto:data.ImpTotal,
      ImpOpEx:0,
      ImpTrib:0,
      ImpIVA:0,
      MonId:"PES",
      MonCotiz:1
 */

const Invoice = new Schema({
  
  concepto: {
    type: String,
    required: true,
  },
  
  docTipo: {
    type: Number,
    required: true,
  },
  
  docNro: {
    type: String,
    required: true,
  },
  cbteTipo: {
    type: String,
    required: true,
  },
  ptoVenta: {
    type: String,
    required: true,
  },
  comprobante: {
    type: String,
    required: true,
  },
  
  fechaComprobante: {
    type: String,
    required: true,
  },
  importeNeto: {
    type: Number,
    required: true,
  },
  importeTotal: {
    type: Number,
    required: true,
  },
  detalle: {
    type: Array,
    required: true,
  },
  CAE: {
    type: String,
    required: true,
  }

});

export default mongoose.model("invoices", Invoice);