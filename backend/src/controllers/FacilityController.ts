import { Request, Response } from "express";
import FacilityService from "../services/FacilityService";

const getFacility = async  (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const facility = id ? await FacilityService.getFacilityById(id) : await FacilityService.getFirstFacility();
        res.json(facility);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message});
    }
};

const getAllFacilities = async (req: Request, res: Response) => {
    try {
        const facilities = await FacilityService.getAllFacilities();
        res.json(facilities);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message});
    }
};

const getTimeslots = async (req: Request, res: Response) => {
    try {
        const facilityId = req.params.id;
        const dateParam = req.params.date;
        const date = new Date(dateParam);

        const timeslots = await FacilityService.getTimeslotsForDate(facilityId, date);
        res.json(timeslots);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const searchFacilities = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        const results = await FacilityService.searchFacilities(q as string);
        res.json(results);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};


export default {
    getFacility,
    getAllFacilities,
    getTimeslots,
    searchFacilities,
};