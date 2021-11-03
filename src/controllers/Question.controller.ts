import express, { Request, Response, NextFunction, response } from "express";

import { Questions } from "../models/Question";
import { validator } from "../helpers/validator.helper";
import { successMsg, errorMsg } from "../helpers/formatter.helper";
import { RFC, VALIDATION_ERROR, USER_CREATED, FOUND_USERSDATA, DELETE_USERSDATA } from "./../config/global";
import { Question } from "../data-model/UserData";
import { ObjectId } from "mongodb";
export function QuestionAnswer(req: any, res: Response) {
    const rules = {
        "question": "required",
        "answer": "required"
    };

    validator(req.body, rules, {}, (err: any, status: any) => {
        console.log(req.body);
        if (!status) {
            res.status(RFC.H412).json(successMsg(VALIDATION_ERROR, err.error));
        }
        else {
            let body: Question = req.body;
            let userbody: any = {};
            userbody.question = body['question'];
            userbody.answer = body['answer'];
            userbody.created_at = new Date();
            userbody.updated_at = new Date();

            Questions.createOne(userbody).then((result: any) => {
                res.status(RFC.H201).json(successMsg(USER_CREATED, result));
            }).catch(error => {
                res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
            })
        }
    })
}

export function QAData(req: Request, res: Response) {
    Questions.findAll({}).then((result: any) => {
        res.status(RFC.H200).json(successMsg(FOUND_USERSDATA, result));
    })
        .catch(error => {
            res.status(RFC.H500).json(successMsg(VALIDATION_ERROR, error));
        })
}

export function qaDelete(req: Request, res: Response) {
    var where: any = { _id: new ObjectId(req.body.id) };
    Questions.deleteOne(where).then((result: any) => {
        res.status(RFC.H200).json(successMsg(DELETE_USERSDATA, result));
    }).catch(error => {
        res.status(RFC.H401).json(successMsg(VALIDATION_ERROR, error));
    })
}