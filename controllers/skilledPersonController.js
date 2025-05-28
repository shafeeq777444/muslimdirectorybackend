import Professionals from "../model/Professionals.js";
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

export const getProfessionalsController = async (req, res) => {
    const { professionalCategory = "All", page = 1, limit = 12, search = "", } = req.query;
    const regex = new RegExp(search, "i");
    const query = {};

    if (search) {
        query.$or = [
            { fullName: regex },
            { skills: regex },
            { experience: regex },
            { email: regex },
        ];
    }
     if (professionalCategory&&professionalCategory!=="All" ) {
        query.professionalCategory = professionalCategory ;
    }
    
    console.log(query);

    const items = await Professionals.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    const totalItemsCount = await Professionals.countDocuments(query);
    const totalPages = Math.ceil(totalItemsCount / limit);
    res.status(200).json({ items, totalItemsCount, totalPages, currentPage: page });
};