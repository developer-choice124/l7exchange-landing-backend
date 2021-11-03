import express from "express";

import { fileUpload, UploadImageFile, ImageData, bannerUpdate, bannerDelete } from "../controllers/Files.controller";
import { jwtMiddleware } from "../middlewares/jwt.middleware";
import unlinkImage from '../middlewares/fileUnlink.middleware';
let banner_router = express.Router();

//banner image upload
banner_router.post("/uploadbanner", jwtMiddleware, UploadImageFile, fileUpload);
//logo updata 
banner_router.post("/bannerupdate/:id", jwtMiddleware, unlinkImage, UploadImageFile, bannerUpdate);
//logo updata 
banner_router.post("/bannerdelete/:id", jwtMiddleware, unlinkImage, bannerDelete);
//banner image access
banner_router.get("/banner", ImageData);
export {
    banner_router
};