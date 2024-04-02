import express from 'express';
import { UpdateRole, createRole, deleteRole, getAllRoles } from '../controllers/role.controller.js';

const router = express.Router();

//create a new role in DB
router.post('/', createRole);

//Update role in DB
router.put('/:id', UpdateRole);

//Get all the roles from db
router.get('/', getAllRoles);

//Delete role from db
router.delete('/:id', deleteRole)
export default router;