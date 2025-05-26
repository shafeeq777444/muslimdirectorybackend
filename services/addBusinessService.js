import Business from "../model/Business.js"

export const addBusinessService=async(data)=>{
  const result=await Business.create(data)
  return result
   
}