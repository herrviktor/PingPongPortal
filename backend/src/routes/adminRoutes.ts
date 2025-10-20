import express from 'express';
import AdminController from '../controllers/AdminController';
import { isAdmin, isLoggedIn } from '../middlewares/middleware';

const router = express.Router();

router.get('/', isLoggedIn, isAdmin, AdminController.getAllUsers)
router.post('/create', isLoggedIn, isAdmin, AdminController.createUser);
router.put('/update/:id', isLoggedIn, isAdmin, AdminController.updateUser);
router.delete('/delete/:id', isLoggedIn, isAdmin, AdminController.deleteUser);

export default router;