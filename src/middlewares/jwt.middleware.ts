import { Request, Response, NextFunction } from "express";

import { errorMsg } from "../helpers/formatter.helper";
import { RFC, UNAUTHORIZED_ACCESS, JWT_NOT_FOUND } from "./../config/global";
import { verifyToken } from "../helpers/jwt.helper";

function jwtMiddleware(req:any, res: Response, next: NextFunction) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token) {
        
        const authHeader:any = req.headers.authorization;
        const isJwt = authHeader.includes('Bearer ');
        
        if (isJwt){
            const token = authHeader.replace('Bearer ', '');
            verifyToken(token).then((result:any) => {
                req.auth = result['data'];
                next();
            }).catch(err => {
                res.status(RFC.H401).json(errorMsg('',[err.name, err.message ]));
            });
        }else{
            res.status(RFC.H404).json(errorMsg('',JWT_NOT_FOUND));
        }
    }else {
        // res.sendStatus(401);
        res.status(RFC.H401).json(errorMsg('',UNAUTHORIZED_ACCESS));
    }
}

export {
    jwtMiddleware
}