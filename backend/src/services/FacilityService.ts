import FacilityModel from "../models/FacilityModel"

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
  const facilities = await FacilityModel.find();
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
        d => d.date.toISOString().slice(0,10) === date.toISOString().slice(0,10)
    );
    if (!dateObj) return [];

    return dateObj.timeslots;
};

export default {
    getFacilityById,
    getFirstFacility,
    getAllFacilities,
    getTimeslotsForDate,
}