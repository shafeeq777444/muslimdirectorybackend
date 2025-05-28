import express from 'express'
import { addBusinessController, getBusinessController, getBusinessPdfController } from '../controllers/buisnessController.js'
const route=express.Router()

route.post('/add',addBusinessController)
route.get('/get',getBusinessController)
route.get('/pdf',getBusinessPdfController)


export default route