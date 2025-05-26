import express from 'express'
import { addBusinessController, getBusinessController } from '../controllers/buisnessController.js'
const route=express.Router()

route.post('/add',addBusinessController)
route.get('/get',getBusinessController)

export default route