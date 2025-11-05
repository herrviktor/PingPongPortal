import { Request, Response } from "express";
import BookingService from "../services/BookingService";

const getUserBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await BookingService.getUserBookings(req.user.id);
        res.json({ bookings });
    } catch (error) {
        console.error("Fel vid hämtning av bokningar:", error);
        res.status(400).json({ message: (error as Error).message });
    }
};

const createBooking = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Inte inloggad" });
        }

        const { facilityId, date, time } = req.body;
        if (!facilityId || !date || !time) {
            return res.status(400).json({ message: "Saknar obligatoriska fält" });
        }

        const result = await BookingService.createBooking({
            facilityId,
            date: new Date(date),
            time,
            userId
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const deleteBooking = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const bookingId = req.params.id; // hämtas från URL :id

        await BookingService.deleteBooking(userId, bookingId);
        res.json({ message: "Bokning raderad" });
    } catch (error) {
        console.error("Fel vid radering av bokning:", error);
        res.status(400).json({ message: (error as Error).message });
    }
};

export default {
    getUserBookings,
    createBooking,
    deleteBooking,
};