import UserModel from "../models/UserModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserRegister {
    username: string;
    email: string;
    password: string;
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

const register = async (data: IUserRegister) => {
    const existingUser = await UserModel.findOne({ 
        $or: [{ email: data.email }, {username: data.username}] 
    });
    if (existingUser) {
        if (existingUser.email) throw new Error('Emailen används redan på sidan');
        if (existingUser.username) throw new Error('Användarnamnet används redan på sidan');
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

    const token = jwt.sign({ id: user._id, email: user.email}, JWT_SECRET, {expiresIn: '24h'});

    return { token, user: { id: user._id, username: user.username, email: user.email } };
};

export default {
    register,
    login,
}