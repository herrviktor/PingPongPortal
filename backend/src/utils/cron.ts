import cron from 'node-cron';
import FacilityModel from '../models/FacilityModel';

export const startCronJobs = () => {
    const newTimeslots = [
    { time: '09:00-10:00', isBooked: false, isBookedBy: null },
    { time: '10:00-11:00', isBooked: false, isBookedBy: null },
    { time: '11:00-12:00', isBooked: false, isBookedBy: null },
    { time: '12:00-13:00', isBooked: false, isBookedBy: null },
    { time: '13:00-14:00', isBooked: false, isBookedBy: null },
    { time: '14:00-15:00', isBooked: false, isBookedBy: null },
    { time: '15:00-16:00', isBooked: false, isBookedBy: null },
    { time: '16:00-17:00', isBooked: false, isBookedBy: null },
    { time: '17:00-18:00', isBooked: false, isBookedBy: null },
    { time: '18:00-19:00', isBooked: false, isBookedBy: null },
    { time: '19:00-20:00', isBooked: false, isBookedBy: null },
    { time: '20:00-21:00', isBooked: false, isBookedBy: null },
    ];

    cron.schedule('0 22 * * *', async () => {
    try {
        const facilities = await FacilityModel.find({});
        for (const facility of facilities) {
        facility.availableDates.sort((a, b) => a.date.getTime() - b.date.getTime());
        facility.availableDates.shift();

        const lastDate = facility.availableDates[facility.availableDates.length - 1].date;
        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + 1);

        facility.availableDates.push({
            date: nextDate,
            timeslots: newTimeslots
        });

        await facility.save();
        console.log(`Uppdaterade facility ${facility.name}`);
        }
    } catch (err) {
        console.error('Fel vid uppdatering:', err);
    }
    });
}
