import mongoose from "mongoose";

const BuisnessSchema=mongoose.Schema({
     businessName:{type:String,required:true},
        businessCategory:{type:String,required:true},
        businessDescription: {type:String},
        firstName:  {type:String,required:true},
        lastName: {type:String,required:true},
        position:  {type:String,required:true},
        streetAddress: {type:String,required:true},
        streetAddress2: {type:String},
        city:{type:String,required:true},
        state: {type:String,required:true},
        postalCode: {type:String,required:true},
        contactNumber: {type:Number,required:true, match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']},
        email:  {type:String,required:true,match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']},
        website: {type:String},
})

export default mongoose.model('BuisnessDetail',BuisnessSchema)