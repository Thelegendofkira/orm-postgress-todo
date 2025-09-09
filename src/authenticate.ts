import { Request,Response,NextFunction } from "express";
import { extend } from "zod/mini";
import jwt from "jsonwebtoken"

 
const secret=process.env.JWT_SECRET as string;
if (!secret) {
  throw new Error("JWT_SECRET not set in environment variables");
}
export interface AuthRequest extends Request{
    user?:{userId:number,username:string}
}

export async function authenticate(req:AuthRequest,res:Response,next:NextFunction){
const token=req.headers['token'] as string;
if(token==undefined){throw new Error("token not present")}
const decode=jwt.verify(token,secret)as {userId:number,username:string};
req.user=decode;
next();

}
