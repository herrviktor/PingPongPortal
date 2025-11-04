import express, { Request, Response } from "express";
import connectDB from './db';
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import facilityRoutes from "./routes/facilityRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.ALLOWED_ORIGINS) {
  throw new Error("Missing ALLOWED_ORIGINS environment variable");
}

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));




app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/facilities", facilityRoutes);
app.use("/bookings", bookingRoutes);

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