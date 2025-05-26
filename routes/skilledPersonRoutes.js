import express from 'express'
import { addSkilledPersonController } from '../controllers/skilledPersonController.js'
import { upload } from '../config/multer.js'
import { getProfessionalsController } from '../controllers/buisnessController.js'
const route=express.Router()

route.post('/add',upload.single('resume'),addSkilledPersonController)
route.get('/get',getProfessionalsController)

export default route