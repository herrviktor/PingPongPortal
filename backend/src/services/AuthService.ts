import UserModel from "../models/UserModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserRegister } from "../interfaces/interfaces";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

const register = async (data: IUserRegister) => {
    if (data.username.length > 20) {
        throw new Error("Användarnamnet får högst vara 20 tecken");
    }
    if (data.password.length < 8) {
        throw new Error("Lösenordet måste vara minst 8 tecken");
    }
    const existingUser = await UserModel.findOne({
        $or: [{ email: data.email }, { username: data.username }]
    });
    if (existingUser) {
        if (existingUser.email === data.email) throw new Error('Emailen används redan på sidan');
        if (existingUser.username === data.username) throw new Error('Användarnamnet används redan på sidan');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new UserModel({
        username: data.username,
        email: data.email,
        password: hashedPassword
    });

    return user.save();
};

const login = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('Felaktigt användarnamn eller lösenord');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Felaktigt användarnamn eller lösenord');

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });

    return { token, user: { id: user._id, username: user.username, email: user.email } };
};

export default {
    register,
    login,
}