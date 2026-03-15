import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true
},

email: {
type: String,
required: true,
unique: true,
trim: true
},

password: {
type: String,
required: true
},

role: {
type: String,
enum: ["user", "seller", "admin"],
default: "user"
},

// seller account status
status: {
type: String,
enum: ["pending", "approved", "rejected"],
default: "pending"
},

// seller store info
storeName: {
type: String,
default: ""
},

phone: {
type: String,
default: ""
},

businessName: {
type: String,
default: ""
},

gstNumber: {
type: String,
default: ""
},

panNumber: {
type: String,
default: ""
},

address: {
type: String,
default: ""
},

// document proofs
gstProof: {
type: String,
default: ""
},

idProof: {
type: String,
default: ""
},

// admin verification
isVerified: {
type: Boolean,
default: false
}

},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;