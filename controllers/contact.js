// Contacts controller all operations regarding sending response for contacts handled here
import Contact from '../models/contact.js';
import mongoose from 'mongoose'; 

// for creating contact
export const createContact= async (req,res)=>{

  // destructuring required data from request body
  const {email,name,phone} = req.body;
  
  // checking required data present or not
  if(!(email && name)){

    // if required data not present then i cant be saved in db and will return error to client
    return res.status(400).json({result:"Name and Email are required for creating a contact"});
  }
  try{
    // looking for contact currently present in db with current contact email 
    var existContact = await Contact.findOne({email});
    // if found any contact with email id then it means that it can make our contact duplicate so we will return error
    if(existContact) return res.status(400).json({message:"Contact exist with this email : "+email});
    // if not found duplicate email then create contact
    const result = await Contact.create({email,name,phone});
    // return created contact
    return res.status(200).json({result:result});
  }catch(e){
    // if caught any error then will return fom here 
    return res.status(500).json(e);
  }
}

// get contacts function will run after pagination middleware 
export const getContacts= async (req,res)=>{
  // returning data which we processed in middleware
  res.status(200).json(res.paginatedResults);
}

// finding contact function will return result which we found by property in middleware 
export const findContact=async (req,res)=>{
  res.status(200).json(res.paginatedResults);
}

// for updating contact
export const updateContact= async (req,res)=>{
  // retrieving data from request 
  const {id} =req.params;
  const {name,email,phone} = req.body;

  // checking provided id is valid or not
  // if not valid then we dont update simple return error mesage
  if(!mongoose.Types.ObjectId.isValid(id)) req.status(404).send({message:'No contact with this id'});

  // retrieving existing contact with email   
  const existingContact = await Contact.findOne({email});

  // if email is present and it is not current object which means it is duplicate email so we return error
  if( existingContact && existingContact._id!=id) return res.status(400).json({message:"User already exist with this email : "+email});
  // making new contact object
  let updatedContact = { name,email,phone, _id: id };
  // finding object and updating in db
  updatedContact=await Contact.findByIdAndUpdate(id, updatedContact, { new: true });
  // returning updated result
  res.status(200).json(updatedContact);
}


// function for deleting contact by id
export const deleteContact=async (req,res)=>{
  // gettig id from request
  const {id} = req.params;
  // checking id is valid or not
  // if id is not valid then we return error
  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send({message:`No contact with id: ${id}`});
  // finding by id and deleting
  await Contact.findByIdAndRemove(id);
  // returning success message
  res.json({ message: "Contact deleted successfully." });
}
