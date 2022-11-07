import bcrypt from "bcryptjs";
import createHttpError from "http-errors";

import Users from "./model.js";

export async function createUser(req, res) {
  try {
    const { email, password, permissionLevel } = req.body;

    const userFound = await Users.findOne({ email });

    if (userFound)
      return res.status(409).json("User Already Exist");

    const newUser = await Users.create({
      email: email,
      password: bcrypt.hashSync(password, 10),
      permissionLevel: permissionLevel,
    });
    return res.status(200).json(`User ${newUser.email} Created Successfully`);
  } catch (error) {
    return res.status(500).json(error);
  }
}
export async function getAll(req, res) {
  try {
    const allUsers = await Users.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error)
    return res.status(500).json('Error'+ error);
  }
}
export async function getOne(req, res, next) {
  try {
    const user = req.params.email;
    const oneUser = await Users.findOne({ email: user });
    (!oneUser) ? next(createHttpError(404, 'User Not Found')) : res.status(200).json(oneUser);
  } catch (error) {
    next(createHttpError(500, error));
  }
}
export async function deleteUser(req, res) {

  try {
    const userToDelete = req.params.email;
    if (await Users.findOne({ email: userToDelete })) {
      await Users.deleteOne({ email: userToDelete });
      res.status(200).json('Deleted Successfully');
    } else {
      res.status(404).json('User not Found');
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
