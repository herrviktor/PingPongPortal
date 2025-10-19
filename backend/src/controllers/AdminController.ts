import { Request, Response } from 'express';
import AuthService from "../services/AuthService"
import AdminService from '../services/AdminService';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json({ message: 'Användare skapad', user});
    } catch (error) {
        console.error("Fel vid skapandet av användare:", error);
        res.status(409).json({ message: (error as Error).message});
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await AdminService.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }
        res.json({ message: 'Användare uppdaterad', user });
    } catch (error) {
        console.error("Fel vid uppdaterande av användare:", error);
        res.status(400).json({ message: (error as Error).message})
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await AdminService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }
        res.json({ message: 'Användare raderad' });
    } catch (error) {
        console.error("Fel vid raderande av användare:", error);
        res.status(400).json({ message: (error as Error).message });
    }
};

export default {
    createUser,
    updateUser,
    deleteUser,
};