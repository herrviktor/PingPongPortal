import FacilityModel from "../models/FacilityModel"
import { sanitizeRegex } from "../utils/validators";

const getFacilityById = async (id: string) => {
    const facility = await FacilityModel.findById(id);
    if (!facility) {
        throw new Error("Inga sporthallar hittade");
    }
    return facility;
};

const getFirstFacility = async () => {
    const facility = await FacilityModel.findOne();
    if (!facility) {
        throw new Error("Ingen sporthall hittades");
    }
    return facility;
};

const getAllFacilities = async () => {
    const facilities = await FacilityModel.find({}, 'name');
    if (!facilities) {
        throw new Error("Inga sporthallar hittades");
    }
    return facilities;
};

const getTimeslotsForDate = async (id: string, date: Date) => {
    const facility = await FacilityModel.findById(id);
    if (!facility) {
        throw new Error("Sporthallen hittades ej");
    }

    const dateObj = facility.availableDates.find(
        d => d.date.toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
    );
    if (!dateObj) return [];

    return dateObj.timeslots;
};

const searchFacilities = async (query: string) => {
    if (!query || typeof query !== 'string') {
        throw new Error('Sökfråga saknas eller är ogiltig');
    }
    if (query.length > 50) {
        throw new Error('Sökfrågan får vara högst 50 tecken');
    }
    const cleanQuery = sanitizeRegex(query.trim());
    const regex = new RegExp(cleanQuery, 'i');
    const facilities = await FacilityModel.find({
        $or: [{ name: regex }, { locations: regex }]
    }).limit(10);
    return facilities;
};


export default {
    getFacilityById,
    getFirstFacility,
    getAllFacilities,
    getTimeslotsForDate,
    searchFacilities,
}