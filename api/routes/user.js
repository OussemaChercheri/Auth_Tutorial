import express from 'express';
import { getAllUser, getById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//get all
router.get('/',verifyAdmin, getAllUser);

//get by id
router.get('/:id',verifyUser, getById);

export default router;