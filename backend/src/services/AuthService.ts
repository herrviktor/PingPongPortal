import UserModel from "../models/UserModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserRegister } from "../interfaces/interfaces";
import { sanitize, validateEmail, validatePassword, validateUsername } from "../utils/validators";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

const register = async (data: IUserRegister) => {
    if (!validateUsername(data.username)) {
        throw new Error("3-20 tecken, bara bokstäver, siffror eller understreck");
    }
    if (!validateEmail(data.email)) {
        throw new Error("Ogiltig e-postadress");
    }
    if (!validatePassword(data.password)) {
        throw new Error("Lösenordet måste vara minst 8 tecken och högst 30");
    }
    const cleanUsername = sanitize(data.username);
    const cleanEmail = sanitize(data.email);
    const existingUser = await UserModel.findOne({
        $or: [{ email: cleanEmail }, { username: cleanUsername }]
    });
    if (existingUser) {
        if (existingUser.email === data.email) throw new Error('Emailen används redan på sidan');
        if (existingUser.username === data.username) throw new Error('Användarnamnet används redan på sidan');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new UserModel({
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword
    });

    return user.save();
};

const login = async (email: string, password: string) => {
    if (!validateEmail(email)) {
        throw new Error('Felaktigt format på e-postadress');
    }
    if (typeof password !== 'string' || password.length === 0) {
        throw new Error('Felaktigt format på lösenord');
    }
    const cleanEmail = sanitize(email);
    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user) throw new Error('Felaktigt användarnamn eller lösenord');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Felaktigt användarnamn eller lösenord');

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });

    return { token, user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin } };
};

export default {
    register,
    login,
}