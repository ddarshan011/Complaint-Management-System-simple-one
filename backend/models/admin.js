import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required:  true },
  email: { 
    type: String,
    required: true,
    unique: true, // Ensure that email is unique across users
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
   },
  password: { type: String, required: true },
  id: { type: String },
  status:{ type: String}
  });


const Admin = mongoose.model('Admin', adminSchema);
 export default Admin;  // Use ES module export
// export default mongoose.model("User", userSchema);