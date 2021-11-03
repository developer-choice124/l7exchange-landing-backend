import express from "express";

import { UploadLogoFile, logoUpload, logoData, logoUpdate } from "../controllers/Logo.controller";
import { UploadSocialFile, logoSocialUpload, socialLinksData, socialDelete } from "../controllers/Social.controller";
import { UploadAdsFile, adsUpload, adsData, deleteAds } from "../controllers/Ads.controller";
import { PrivacyPolicy, policyData, policyDelete } from "../controllers/Privacy.controller";
import { QuestionAnswer, QAData, qaDelete } from "../controllers/Question.controller"
import { jwtMiddleware } from "../middlewares/jwt.middleware";
import unlinkImage from '../middlewares/fileUnlink.middleware';
let setting_router = express.Router();

//logo upload
setting_router.post("/uploadlogo", jwtMiddleware, UploadLogoFile, logoUpload);
//Social Media Links upload
setting_router.post("/socialmedia", jwtMiddleware,UploadSocialFile, logoSocialUpload);
//privacy-policy 
setting_router.post("/privacypolicy", jwtMiddleware,PrivacyPolicy);
//logo updata 
setting_router.post("/logoupdate/:id", jwtMiddleware, unlinkImage, UploadLogoFile, logoUpdate);
//question Answer 
setting_router.post("/quesans", jwtMiddleware, QuestionAnswer);
//Question Answer delete
setting_router.post("/qadelete", jwtMiddleware, qaDelete);
//upload ads
setting_router.post("/ads", jwtMiddleware, UploadAdsFile, adsUpload);
//delete ads
setting_router.post("/deleteads/:id", jwtMiddleware, unlinkImage, deleteAds);
//delete ads
setting_router.post("/deletesocial/:id", jwtMiddleware, unlinkImage, socialDelete);
//delete social media link icons
setting_router.post("/deletepolicy", jwtMiddleware, policyDelete);
//logo access
setting_router.get("/setting/:slug", logoData);
//logo access
setting_router.get("/media", socialLinksData);
//question Answer 
setting_router.get("/findqa", QAData);
//get ads
setting_router.get("/adslist", adsData);
//privacy-polisy
setting_router.get("/policydata", policyData);
export {
    setting_router
};