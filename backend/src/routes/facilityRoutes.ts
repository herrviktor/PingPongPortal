import express from 'express';
import FacilityController from '../controllers/FacilityController';
import { isLoggedIn } from '../middlewares/middleware';

const router = express.Router();

router.get('/', FacilityController.getAllFacilities);
router.get('/search', isLoggedIn, FacilityController.searchFacilities);
router.get('/:id', FacilityController.getFacility);
router.get('/:id/availableDates/:date/timeslots', FacilityController.getTimeslots);

export default router;