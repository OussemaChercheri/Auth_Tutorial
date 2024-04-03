import express from 'express';
import { UpdateRole, createRole, deleteRole, getAllRoles } from '../controllers/role.controller.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//create a new role in DB
router.post('/', verifyAdmin, createRole);

//Update role in DB
router.put('/:id', verifyAdmin, UpdateRole);

//Get all the roles from db
router.get('/', verifyAdmin, getAllRoles);

//Delete role from db
router.delete('/:id', verifyAdmin, deleteRole)
export default router;