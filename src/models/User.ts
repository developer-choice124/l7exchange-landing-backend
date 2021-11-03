import { connectTable } from "./connectTable";
import { MongoError } from "mongodb";

export class User {

    private static _table = "users";

    public static createOne(body:any){
        
        return new Promise((resolve, reject) => {
            connectTable(User._table).insertOne(body, (err: MongoError, res:any) => {
                
                if(err){
                    reject(err);
                }
                resolve(res.ops);
            });
        });
    }


    public static createMany(body:any){

    }

    public static findAll(where:any={}){
        return new Promise((resolve, reject) => {
            connectTable(User._table).find(where).toArray((err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }

    public static findOne(where:any){
        
        return new Promise((resolve, reject) => {
            connectTable(User._table).findOne(where, (err:MongoError, res:any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }
    public static updateOne(where:any, data:any){
        return new Promise((resolve, reject) => {
            connectTable(User._table).updateOne(where, data, (err:MongoError, res:any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }
    public static deleteOne(where:any){
        return new Promise((resolve, reject) => {
            connectTable(User._table).deleteOne(where, (err:MongoError, res:any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }
    public static createParent(where:any){
        return new Promise((resolve, reject) => {
            connectTable("parent_relation").insertOne(where, (err:MongoError, res:any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }

}