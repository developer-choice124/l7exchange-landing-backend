import express, { Request, Response, NextFunction, response } from "express";

import path from "path";
import Multer from "multer";
import { v4 } from "uuid";
import { validator } from "../helpers/validator.helper";
import { Settings } from "../models/Setting";
import { RFC, VALIDATION_ERROR, USER_CREATED, FOUND_USERSDATA, TYPES } from "./../config/global";
import { successMsg, errorMsg } from "../helpers/formatter.helper";
import { config } from "./../config/config";
import { NewImage } from "../data-model/UserData";
import { ObjectId } from "mongodb";

const uploadPath = "../../public/logo";

const openPath = path.join(__dirname, uploadPath);

const LogoFile = Multer.diskStorage({
    destination: openPath,
    filename: function (req, file, cd) {
        cd(null, v4() + "Logo" + Date.now() + path.extname(file.originalname));
    }
});

const validatorFile = (req: any, file: any, cd: any) => {
    if (file.mimetype == 'image/png') {
        cd(null, true);
    } else {
        cd(null, false);
    }
}

export const UploadLogoFile = Multer({
    storage: LogoFile, fileFilter: validatorFile
}).single('logoImage');

export function logoUpload(req: any, res: Response) {
    const rules = {
        "type": ['required', { 'in': TYPES }]
    };
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).json(successMsg(VALIDATION_ERROR, err.error));
        }
        else {
            let body: NewImage = req.body;
            let userbody: any = {};
            if (req.file.filename == ! null) {
                return "undefind file name";
            } else {
                userbody.image = `${config.imagePath}/assets/logo/${req.file.filename}`;
                userbody.type = body['type'];
                userbody.created_at = new Date();
                userbody.updated_at = new Date();
                Settings.createOne(userbody).then((result: any) => {
                    res.status(RFC.H201).json(successMsg(USER_CREATED, result));
                }).catch(error => {
                    res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
                })
            }
        }
    })
}

export function logoData(req: Request, res: Response) {
    var where: any = { type: 'logo' };
    Settings.findAll(where).then((result: any) => {
        res.status(RFC.H200).json(successMsg(FOUND_USERSDATA, result));
    })
        .catch(error => {
            res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
        })
}


export function logoUpdate(req: any, res: Response) {
    const rules = {
    };
    console.log("req file: ",req.file)
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).send(errorMsg(VALIDATION_ERROR, err.errors));
        }
        else {
            var where: any = { _id: new ObjectId(req.params.id) };            
            var newvalues = { $set: { image: `${config.imagePath}/assets/logo/${req.file.filename}` } };
            Settings.updateOne(where, newvalues).then((result: any) => {
                res.status(RFC.H201).json(successMsg(FOUND_USERSDATA, result));
            })
                .catch(error => {
                    res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
                })
        }
    });
}

