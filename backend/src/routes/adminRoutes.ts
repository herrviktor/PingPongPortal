import express from 'express';
import AdminController from '../controllers/AdminController';

const router = express.Router();

router.post('/create', AdminController.createUser);
router.put('/update/:id', AdminController.updateUser);
router.delete('/delete/:id', AdminController.deleteUser);

export default router;