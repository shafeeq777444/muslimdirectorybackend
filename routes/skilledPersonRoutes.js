import express from 'express'
import { addSkilledPersonController, getProfessionalsController } from '../controllers/skilledPersonController.js'
import { upload } from '../config/multer.js'
const route=express.Router()

route.post('/add',upload.single('resume'),addSkilledPersonController)
route.get('/get',getProfessionalsController)

export default route