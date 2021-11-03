import express, { Request, Response, NextFunction, response } from "express";

import path from "path";
import Multer from "multer";
import { v4 } from "uuid";
import { validator } from "../helpers/validator.helper";
import { Settings } from "../models/Setting";
import { successMsg, errorMsg } from "../helpers/formatter.helper";
import { RFC, VALIDATION_ERROR, USER_CREATED,  FOUND_USERSDATA, TYPES,DELETE_USERSDATA } from "./../config/global";
import { NewImage } from "../data-model/UserData";
import { config } from "./../config/config";
import { ObjectId } from "mongodb";

const uploadPath = "../../public/upload";

const openPath = path.join(__dirname, uploadPath);

const imageFile = Multer.diskStorage({
    destination: openPath,
    filename: function (req, file, cd) {
        cd(null, v4()+ "Banner" + Date.now() + path.extname(file.originalname));
    }
});

const validatorFile = (req: any, file: any, cd: any) => {
    console.log(file)
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cd(null, true);
    }
    else {
        cd(null, false);
    }
}

export const UploadImageFile = Multer({
    storage: imageFile, limits: {
        fileSize: 1000000
    }, fileFilter: validatorFile
}).single('banner');

export function fileUpload(req: any, res: Response) {
    const rules = {
        "type": ['required',{'in' : TYPES }]
    };
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).json(successMsg(VALIDATION_ERROR, err.error));
        }
        else {
            let body: NewImage = req.body;
            let userbody: any = {};
            userbody.image = `${config.imagePath}/assets/upload/${req.file.filename}`;
            userbody.type = body["type"];
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

export function ImageData(req: Request, res: Response) {
    var where: any = { type:  "banner" };
    Settings.findAll(where).then((result: any)=> {
        res.status(RFC.H200).json(successMsg(FOUND_USERSDATA,result));
    })
    .catch(error => {
        res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
    })
}

export function bannerUpdate(req: any, res: Response) {
    const rules = {
    };
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).send(errorMsg(VALIDATION_ERROR, err.errors));
        }
        else {
            var where: any = { _id: new ObjectId(req.body.id) };
            
            var newvalues = { $set: { image: `${config.imagePath}/assets/upload/${req.file.filename}` } };
            Settings.updateOne(where, newvalues).then((result: any) => {
                res.status(RFC.H201).json(successMsg(FOUND_USERSDATA, result));
            })
                .catch(error => {
                    res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
                })
        }
    });
}

export function bannerDelete(req: Request, res: Response) {
    var where: any = { _id: new ObjectId(req.params.id) };
    Settings.deleteOne(where).then((result: any) => {
        res.status(RFC.H200).json(successMsg(DELETE_USERSDATA, result));
    }).catch(error => {
        res.status(RFC.H401).json(successMsg(VALIDATION_ERROR, error));
    })
}