import { addSkilledPersonService } from "../services/skilledPersonService.js"

export const addSkilledPersonController = async (req,res)=>{
    const filePath = `uploads/${req.file.filename}`;
    try{
  const result =  await addSkilledPersonService(req.body,filePath)
  res.status(200).json({
      message: "Personal Details added successfully",
      result
   })

    }catch(err){
        console.log(err)
    }
}