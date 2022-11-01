
import Users from '../apiServices/users/model.js';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
config()

const findAdmin = async () => {
  // check for an existing admin user
  const userFound = await Users.findOne({ email: process.env.USER_ADMIN });

  if (userFound) return;

  // create a new admin user
  const newUser = await Users.create({
    email: process.env.USER_ADMIN,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,10),
    permissionLevel: 7,
  });

  console.log(`new user created: ${newUser.email}`);
};


export default findAdmin;