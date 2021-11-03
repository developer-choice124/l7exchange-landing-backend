import express, { Request, Response, NextFunction, response } from "express";

import { Settings } from "../models/Setting";
import { validator } from "../helpers/validator.helper";
import { successMsg, errorMsg } from "../helpers/formatter.helper";
import { RFC, VALIDATION_ERROR, USER_CREATED, TYPES, FOUND_USERSDATA, DELETE_USERSDATA } from "./../config/global";
import { NewImage } from "../data-model/UserData";
import { ObjectId } from "mongodb";
export function PrivacyPolicy(req: any, res: Response) {
    const rules = {
        "polcisypolicy": "required",
        "type": ['required', { 'in': TYPES }]
    };

    validator(req.body, rules, {}, (err: any, status: any) => {
        console.log(req.body);
        if (!status) {
            res.status(RFC.H412).json(successMsg(VALIDATION_ERROR, err.error));
        }
        else {
            let body: NewImage = req.body;
            let userbody: any = {};
            userbody.polcisypolicy = body['polcisypolicy'];
            userbody.type = body['type'];
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


export function policyData(req: Request, res: Response){
    var where: any = { type:  "privacy-policy" };
    console.log(where);
    Settings.findAll(where).then((result: any)=> {
        res.status(RFC.H200).json(successMsg(FOUND_USERSDATA,result));
    })
    .catch(error =>{
        res.status(RFC.H500).json(successMsg(VALIDATION_ERROR,error));
    })
}

export function policyDelete(req: Request, res: Response) {
    var where: any = { _id: new ObjectId(req.body.id) };
    Settings.deleteOne(where).then((result: any) => {
        res.status(RFC.H200).json(successMsg(DELETE_USERSDATA, result));
    }).catch(error => {
        res.status(RFC.H401).json(successMsg(VALIDATION_ERROR, error));
    })
}