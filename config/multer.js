// multer

import multer from "multer";
import path from "path";
import { currentAppPath } from "../server.js";

// 1.configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(currentAppPath, "uploads"));
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const timestamp = Date.now();
        const dateObj = new Date(timestamp);

        // Format: YYYY-MM-DD_HH-MM-SS
        const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-${dateObj
            .getDate()
            .toString()
            .padStart(2, "0")}_${dateObj.getHours().toString().padStart(2, "0")}-${dateObj
            .getMinutes()
            .toString()
            .padStart(2, "0")}-${dateObj.getSeconds().toString().padStart(2, "0")}`;
        const fileName = `${formattedDate}_${originalName}`;
        cb(null, fileName);
    },
});
// 2. Create the multer instance
export const upload = multer({ storage });
