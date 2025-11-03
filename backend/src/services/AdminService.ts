import { IUpdateUser } from "../interfaces/interfaces";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";

const getAllUsers = async () => {
    return UserModel.find({});
}

const updateUser = async (id: string, data: IUpdateUser) => {
    const updateData = { ...data };
    if (data.username) {
        if (data.username.length > 20) throw new Error("Användarnamnet får högst vara 20 tecken");
    }
    if (data.password) {
        if (data.password.length < 8) throw new Error("Lösenordet måste vara minst 8 tecken");
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