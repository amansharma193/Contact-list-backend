import mongoose from "mongoose";

/**
 * Contact schema with created with
 * the help of mongoose schema for 
 * structuring of contacts
 * and easy data operations 
 */
const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
});

const Contact = mongoose.model("contact", contactSchema);
export default Contact;
