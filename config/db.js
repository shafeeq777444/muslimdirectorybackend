import mongoose from "mongoose";


const connectDB=()=>{mongoose.connect('mongodb+srv://shafeeq:sneak@cluster0.sq01t.mongodb.net/muslimDirectory').then(()=>{


}).catch((er)=>{
        console.log(er)
    })
}
export default connectDB