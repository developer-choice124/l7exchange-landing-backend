import express, { Request, Response, NextFunction, response } from "express";

import path from "path";
import Multer from "multer";
import { v4 } from "uuid";
import { validator } from "../helpers/validator.helper";
import { Settings } from "../models/Setting";
import { successMsg } from "../helpers/formatter.helper";
import { RFC, VALIDATION_ERROR, USER_CREATED, FOUND_USERSDATA, TYPES, DELETE_USERSDATA } from "./../config/global";
import { NewImage } from "../data-model/UserData";
import { config } from "./../config/config";
import { ObjectId } from "mongodb";

const uploadPath = "../../public/logo";

const openPath = path.join(__dirname, uploadPath);

const LogoSocial = Multer.diskStorage({
    destination: openPath,
    filename: function (req, file, cd) {
        cd(null, v4()+ "LogoSocialmedia" + Date.now() + path.extname(file.originalname));
    }
});

const validatorFile = (req: any, file: any, cd: any) => {

    if (file.mimetype == 'image/png') {
        cd(null, true);
    }
    else {
        cd(null, false);
    }
}

export const UploadSocialFile = Multer({
    storage: LogoSocial, limits: {
        fileSize: 10000
    }, fileFilter: validatorFile
}).single('Icon');

export function logoSocialUpload(req: any, res: Response) {
    const rules = {
        "mediaName": "required",
        "type": ['required',{'in' : TYPES }]
    };
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).json(successMsg(VALIDATION_ERROR, err.error));
        }
        else {
            let body: NewImage = req.body;
            let userbody: any = {};
            userbody.mediaName = body['mediaName'];
            userbody.link = body['link'];
            userbody.type = body['type'];
            userbody.image = `${config.imagePath}/assets/logo/${req.file.filename}`;
            userbody.created_at = new Date();
            userbody.updated_at = new Date();
            Settings.createOne(userbody).then((result: any) => {
                    res.status(RFC.H201).json(successMsg(USER_CREATED, result));
             }).catch(error => {
                    res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
            })
        }
    })
}

export function socialLinksData(req: Request, res: Response) {
    var where: any = {type : "social-media" };
    Settings.findAll(where).then((result: any)=> {
        res.status(RFC.H200).json(successMsg(FOUND_USERSDATA,result));
    })
    .catch(error => {
        res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
    })
}

export function socialDelete(req: Request, res: Response){
    var where: any = { _id: new ObjectId(req.params.id) };
    Settings.deleteOne(where).then((result: any) => {
        res.status(RFC.H200).json(successMsg(DELETE_USERSDATA,result));
    }).catch(error => {
        res.status(RFC.H401).json(successMsg(VALIDATION_ERROR,error));
    })
}