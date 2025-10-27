import express from "express";
import { isLoggedIn } from "../middlewares/middleware";
import BookingController from "../controllers/BookingController";

const router = express.Router();

router.get("/", isLoggedIn, BookingController.getUserBookings);
router.post("/create", isLoggedIn, BookingController.createBooking);
router.delete("/delete/:id", isLoggedIn, BookingController.deleteBooking);

export default router;
