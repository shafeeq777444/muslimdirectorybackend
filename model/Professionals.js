import mongoose from "mongoose";

const ProfessionalScehma=mongoose.Schema({
     fullName: {type:String,required:true},
        email: {type:String,required:true,},
        contactNumber: {type:Number,required:true,},
        skills: {type:String,required:true},
        experience: {type:String,required:true},
        resume: {type:String},
})

export default mongoose.model('Professional',ProfessionalScehma)