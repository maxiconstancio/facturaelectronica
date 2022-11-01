import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 
 * Users Model
 * PermissionLevels:   admin: 7
 *                     guest: 1 
 *                     default: 1 
 */
const Users = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissionLevel: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("users", Users);
