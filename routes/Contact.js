import express from 'express'
import { addNewContact, delete_Contact, update_Contact, getAllContacts, getContactById, getContactByUserId } from '../controllers/Contact.js'

import { Authenticate } from '../Middlewares/Auth.js';

const router = express.Router();

// get all contact
router.get('/', getAllContacts);

// get spacific contact
router.get('/:id', getContactById)

//add contact
router.post('/add', Authenticate, addNewContact)

// update Contact
router.put('/:id', Authenticate, update_Contact)

// delete Contact
router.delete('/:id', Authenticate, delete_Contact)

// get contacts by userId
router.get('/userid/:id', getContactByUserId)

export default router