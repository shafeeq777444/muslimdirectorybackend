import mongoose from "mongoose";


const connectDB=()=>{mongoose.connect(process.env.MONGODURL).then(()=>{
console.log("Mongodb connected ✅")

}).catch((er)=>{
        console.log(er)
    })
}
export default connectDB