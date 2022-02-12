import express from 'express';
import auth from '../middleware/auth.js';
import pagination  from '../middleware/pagination.js';
import Contact from '../models/contact.js';
import { createContact,getContacts,updateContact,deleteContact,findContact } from '../controllers/contact.js';

const router=express.Router();

// calling creating contact function from controller with auth middleware for verification
router.post('/',auth,createContact);

// getting contacts from controller with pagination middleware for limiting
router.get('/',pagination(Contact),getContacts);


// finding contact with the help of pagination middleware which also applies filter on the data
router.post('/find',pagination(Contact),findContact);

// for updating contact
router.put('/:id',auth,updateContact);

// for deleting contact
router.delete('/:id',auth,deleteContact);


export default router;