import express from 'express';
import auth from '../middleware/auth.js';
import pagination  from '../middleware/pagination.js';
import Contact from '../models/contact.js';
import { createContact,getContacts,updateContact,deleteContact,findContact } from '../controllers/contact.js';

const router=express.Router();

router.post('/',auth,createContact);

router.get('/',pagination(Contact),getContacts);
router.post('/find',pagination(Contact),findContact);
router.put('/:id',auth,updateContact);
router.delete('/:id',auth,deleteContact);


export default router;