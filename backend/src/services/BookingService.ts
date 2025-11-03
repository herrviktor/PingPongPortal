import { Types } from "mongoose";
import { IBookingInput } from "../interfaces/interfaces";
import FacilityModel from "../models/FacilityModel"
import UserModel from "../models/UserModel"

const getUserBookings = async (userId: string) => {
    const user = await UserModel.findById(userId)
        .populate({
            path: "bookings.facility",
            model: FacilityModel,
            select: "name hourlyRate"
        });
        if (!user) throw new Error("Användare hittades inte");
        return user.bookings;
};

const createBooking = async ({ facilityId, date, time, userId }: IBookingInput) => {
    const facility = await FacilityModel.findById(facilityId);
    if (!facility) throw new Error("Ingen sporthall hittades");

    const dateObj = facility.availableDates.find(d =>
        d.date.toISOString().slice(0,10) === new Date(date).toISOString().slice(0,10)
    );
    if (!dateObj) throw new Error("Datum finns inte tillgängligt");

    const timeslot = dateObj.timeslots.find(ts => ts.time === time);
    if (!timeslot) throw new Error("Tiden hittades inte");
    if (timeslot.isBooked) throw new Error("Tiden är redan bokad");

    timeslot.isBooked = true;
    timeslot.isBookedBy = new Types.ObjectId(userId);
    await facility.save();

    const user = await UserModel.findById(userId);
    if (!user) throw new Error("Användare hittades inte");
    user.bookings.push({ date, time, facility: new Types.ObjectId(facilityId) });
    await user.save();

    return {
        message: "Bokning av tiden lyckades",
        booking: { date, time, facility: { id: facilityId, name: facility.name } }
    };
};

const deleteBooking = async (userId: string, bookingId:string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("Användare hittades inte");

    const bookingIndex = user.bookings.findIndex(b => b._id?.toString() === bookingId);
    if (bookingIndex === -1) throw new Error("Bokningen hittas inte");

    const [removedBooking] = user.bookings.splice(bookingIndex, 1);
    await user.save();

    const facilityId = removedBooking.facility.toString();
    const facility = await FacilityModel.findById(facilityId);
    if (!facility) throw new Error("Anläggningen finns inte");

    const bookingDate = removedBooking.date;
    const bookingTime = removedBooking.time;

    const availableDate = facility.availableDates.find(
        d => d.date.toISOString().slice(0, 10) === new Date(bookingDate).toISOString().slice(0, 10)
    );

    if (availableDate) {
    const slot = availableDate.timeslots.find(s => s.time === bookingTime);
    if (slot && slot.isBooked && slot.isBookedBy?.toString() === userId) {
      slot.isBooked = false;
      slot.isBookedBy = null;
      await facility.save();
    }
  }

  return true;
};

export default {
    getUserBookings,
    createBooking,
    deleteBooking,
}