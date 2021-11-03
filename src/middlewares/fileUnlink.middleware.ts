// import { response } from "express";
import path from 'path';
import { ObjectId } from "mongodb";
import { Settings } from "../models/Setting";
import fs from "fs";
const Public = "../../../l7_node/public"; //off line
// const Public = "../../../l7exchange/public"; //online 
const openPath = path.join(__dirname, Public);
const unlinkImage = (req: any, res: any, next: any) => {
    const where = { _id: new ObjectId(req.params.id) };
    Settings.findOne(where).then((result: any) => {
        console.log(result.image)
        const Path = result.image;
        const nPath = Path.split("http://localhost:4000/assets");
        // const nPath = Path.split("http://18.222.184.185:4000/assets");
        let NewPath = `${openPath}${nPath[1]}`;
        fs.unlink(NewPath, function (error: any) {
            if (error) {
                console.log(error)
            } else {
                console.log("successfully unlink Image!");
            }
        })
    }).catch(error => {
        console.log(error)
    })
    console.log("end")
    return next();
};
export default unlinkImage;