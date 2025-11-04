import { IUpdateUser } from "../interfaces/interfaces";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";
import { sanitize, validateEmail, validatePassword, validateUsername } from "../validators/validators";

const getAllUsers = async () => {
    return UserModel.find({});
}

const updateUser = async (id: string, data: IUpdateUser) => {
  const updateData = { ...data };
  if (data.username) {
    if (!validateUsername(data.username)) {
      throw new Error("Ogiltigt användarnamn. Bara bokstäver, siffror eller understreck, 3-20 tecken");
    }
    updateData.username = sanitize(data.username);
  }
  if (data.email) {
    if (!validateEmail(data.email)) {
      throw new Error("Ogiltig e-postadress");
    }
    updateData.email = sanitize(data.email);
  }
  if (data.password) {
    if (!validatePassword(data.password)) {
      throw new Error("Lösenordet måste vara minst 8 tecken och högst 30");
    }
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  return UserModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id: string) => {
    return UserModel.findByIdAndDelete(id);
};

export default {
    getAllUsers,
    updateUser,
    deleteUser,
};