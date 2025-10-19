import express, { Request, Response } from "express";
import connectDB from './db';
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('testing backend');
});

const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to database", err);
    }
}

startServer();