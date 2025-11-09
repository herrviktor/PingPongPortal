import express from 'express';
import FacilityController from '../controllers/FacilityController';

const router = express.Router();

router.get('/', FacilityController.getAllFacilities);
router.get('/search', FacilityController.searchFacilities);
router.get('/:id', FacilityController.getFacility);
router.get('/:id/availableDates/:date/timeslots', FacilityController.getTimeslots);

export default router;