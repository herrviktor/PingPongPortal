import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

const register = async (req: Request, res: Response) => {
    try {
        console.log("Startar registrering med data:", req.body);
        const user = await AuthService.register(req.body);
        console.log("Användare registrerad:", user.username, user.email);
        res.status(201).json({ message: 'Användare registrerad', user });
    } catch (error) {
        console.error("Fel vid registrering:", error);
        res.status(409).json({ message: (error as Error).message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        console.log("Startar inloggning för email:", req.body.email);
        const { token, user } = await AuthService.login(req.body.email, req.body.password);
        console.log("Inloggning lyckades för användare:", user.username, user.email);
        res.json({ token, user });
    } catch (error) {
        console.error("Fel vid inloggning:", error);
        res.status(401).json({ message: (error as Error).message });
    }
};

export default {
    register,
    login,
};