import Professionals from "../model/Professionals.js"

export const addSkilledPersonService=async(data,filePath)=>{
   return await Professionals.create({...data,resume:filePath})

}