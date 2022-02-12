import Contact from '../models/contact.js';
import mongoose from 'mongoose'; 

export const createContact= async (req,res)=>{
  const {email,name,phone} = req.body;
  console.log(email,name,phone);
  if(!(email && name)){
    return res.status(400).json({result:"Name and Email are required for creating a contact"});
  }
  try{
    var existContact = await Contact.findOne({email});
    if(existContact) return res.status(400).json({message:"Contact exist with this email : "+email});
    const result = await Contact.create({email,name,phone});
    return res.status(200).json({result:result});
  }catch(e){
    return res.status(500).json(e);
  }
}

export const getContacts= async (req,res)=>{
  res.status(200).json(res.paginatedResults);
}

export const findContact=async (req,res)=>{
  res.status(200).json(res.paginatedResults);
}

export const updateContact= async (req,res)=>{
  const {id} =req.params;
  const {name,email,phone} = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) req.status(404).send({message:'No contact with this id'});
  const existingContact = await Contact.findOne({email});
  if( existingContact && existingContact._id!=id) return res.status(400).json({message:"User already exist with this email : "+email});
  let updatedContact = { name,email,phone, _id: id };
  updatedContact=await Contact.findByIdAndUpdate(id, updatedContact, { new: true });
  res.status(200).json(updatedContact);
}

export const deleteContact=async (req,res)=>{
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send({message:`No contact with id: ${id}`});
  await Contact.findByIdAndRemove(id);
  res.json({ message: "Contact deleted successfully." });
}
