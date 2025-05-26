import express from 'express'
import businesRoutes from './buisnessRoutes.js'
import skilledPersonRoutes from './skilledPersonRoutes.js'
import { upload } from '../config/multer.js'
const route=express.Router()


route.use('/business',businesRoutes)
route.use('/skilledperson',skilledPersonRoutes)

export default route