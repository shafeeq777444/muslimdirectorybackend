import express from "express";
import { config } from "dotenv";
import ErrorHandler from "./middlewares/ErrorHandler.js";
import allRoutes from "./routes/allRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import {fileURLToPath} from 'url'
import path, {dirname} from 'path'

// path of current app
const __filePath=fileURLToPath(import.meta.url)
export const currentAppPath= dirname(__filePath)




// config
config();
connectDB();
const app = express();
app.use(
    cors({
        origin: process.env.FRONTENDURL,
        credentials: true,
    })
);




// middlewares
app.use(express.json());

// routes
app.use("/api", allRoutes);

// static data
app.use('/uploads',express.static(path.join(currentAppPath,'uploads')))

// app.use(ErrorHandler);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`working on port ${port}`);
});
