import express, { Request, Response, NextFunction, response } from "express";

import { User } from "../models/User";
import { validator } from "../helpers/validator.helper";
import { hashPassword, verifyPassword } from "../helpers/hasher.helper";
import { successMsg, errorMsg } from "../helpers/formatter.helper";
import { RFC, VALIDATION_ERROR, USER_CREATED, USER_UPDATED, ROLES, COMMON_SUCCESS, INVALID_USER, LOGIN_SUCCESS, FOUND_USERSDATA, DELETE_USERSDATA } from "./../config/global";
import { UserLogin, ChangePassword, NewUser } from "../data-model/UserData";

import { generateToken } from "../helpers/jwt.helper";
import { ObjectId } from "mongodb";
import { brotliDecompressSync } from "zlib";

export function login(req: Request, res: Response) {

    let body: UserLogin = req.body;    
    User.findOne({ username: body.username, is_active: true }).then((result: any) => {
        console.log(result);
        let { salt, password } = result.password;
        let { username, role, name, _id } = result;
        let token = generateToken({ data: { username, role, name, _id } });

        if (result) {
            // validate password
            console.log("12")
            verifyPassword(body.password, password, salt).then(
                valid => {
                    res.status(RFC.H200).json(successMsg(LOGIN_SUCCESS, { _id, username, name, role, 'token': token.token }));
                }
            ).catch(err => {
                res.status(RFC.H401).json(errorMsg(INVALID_USER, { body, 'error': err }));
            });
        } else {
            console.log("else")
            res.status(RFC.H401).json(errorMsg(INVALID_USER, ''));
        }
    }).catch(err => {
        res.status(RFC.H401).json(errorMsg(INVALID_USER, err));
    });

}

export function changePassword(req: any, res: Response) {
    const rules = {
        "user_id": "required",
        "newpassword": "required|min:6",
        "cnewpassword": "required|min:6"
    };
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).send(errorMsg(VALIDATION_ERROR, err.errors));
        } else {

            let body: ChangePassword = req.body;
            if (body.newpassword == body.cnewpassword) {
                var where = { _id: new ObjectId(body.user_id) };
                var newvalues = { $set: { password: hashPassword(body['newpassword']) } };

                User.updateOne(where, newvalues).then((result: any) => {

                    res.status(RFC.H201).json(successMsg(USER_UPDATED, result));
                }).catch(err => {
                    res.status(RFC.H401).json(errorMsg(INVALID_USER, err));
                });

            } else {
                res.status(RFC.H412).send(errorMsg(VALIDATION_ERROR, err.errors));
            }

        }
    });
    return res.json({
        code: 200,
        msg: "Change Password Success!"
    });
}
export function edit(req: Request, res: Response, next: NextFunction) {


    var where: any = { _id: new ObjectId(req.params.id) };

    User.findOne(where).then((result: any) => {
        res.status(RFC.H201).json(successMsg(COMMON_SUCCESS, result));
    }).catch(error => {
        res.status(RFC.H500).send(errorMsg(VALIDATION_ERROR, error));
    });
}
export function update(req: Request, res: Response, next: NextFunction) {
    var where: any = { _id: new ObjectId(req.params.id) };
    const rules = {
        "user_id": "required",
        "newpassword": "required|min:6",
        "cnewpassword": "required|min:6"
    };
    validator(req.body, rules, {}, (err: any, status: any) => {
        if (!status) {
            res.status(RFC.H412).send(errorMsg(VALIDATION_ERROR, err.errors));
        } else {
            let body = req.body;

            var newvalues = { $set: { password: hashPassword(body['newpassword']) } };

            User.updateOne(where, newvalues).then((result: any) => {

                res.status(RFC.H201).json(successMsg(USER_UPDATED, result));
            }).catch(err => {
                res.status(RFC.H401).json(errorMsg(INVALID_USER, err));
            });

        }
    });
}


export function registerUser (req: any, res: Response){
        const rules = {
            "username": "required|is_exists:users,user_name",
            "mobileno": "required|min:10",
            "role": ['required', { 'in': ROLES }]
        };

        validator(req.body, rules, {}, (err: any, status: any) => {
            if(!status){
                res.status(RFC.H412).json(successMsg(VALIDATION_ERROR,err.error));
            }
            else{
                let body : NewUser = req.body;
                let userbody: any = {};
                userbody.username = body['username'];
                userbody.mobileno = body['mobileno'];
                userbody.message = body['message'];
                userbody.role = body['role'];
                userbody.is_active = true;
                userbody.created_at = new Date();
                userbody.updated_at = new Date();

                User.createOne(userbody).then((result: any) => {
                    res.status(RFC.H201).json(successMsg(USER_CREATED,result));
                }).catch(error =>{
                    res.status(RFC.H500).json(successMsg(VALIDATION_ERROR,error));
                })
            }
        })
}

export function userData(req: Request, res: Response){
    var where: any = { role:  "user" };
    console.log(where);
    User.findAll(where).then((result: any)=> {
        res.status(RFC.H200).json(successMsg(FOUND_USERSDATA,result));
    })
    .catch(error =>{
        res.status(RFC.H500).json(successMsg(VALIDATION_ERROR,error));
    })
}

export function userEdit(req: Request, res: Response){
    const rules = {
        "status" : "required"
    }
    validator(req.body , rules, {} ,(err: any, status: any) => {
        if(!status){
            res.status(RFC.H412).json(errorMsg(VALIDATION_ERROR,err.error));
        }
        else{
            let body = req.body;
            var where: any = { _id: new ObjectId(body.id) };
                console.log(body);
                
                let newValues = {$set: {status: body.status} };

            User.updateOne(where, newValues).then((result: any)=>{
                res.status(RFC.H200).json(successMsg(USER_UPDATED,result));
            }).catch(error =>{
                res.status(RFC.H401).json(successMsg(VALIDATION_ERROR,error));
            })
         }
    })
}

export function userDelete(req: Request, res: Response){
    var where: any = { _id: new ObjectId(req.body.id) };
    User.deleteOne(where).then((result: any) => {
        res.status(RFC.H200).json(successMsg(DELETE_USERSDATA,result));
    }).catch(error => {
        res.status(RFC.H401).json(successMsg(VALIDATION_ERROR,error));
    })
}