import pc_client from "./primsa";
import { usertype,todotype,userschema,todoschema} from "./zod";
import  jwt  from "jsonwebtoken";
import { AuthRequest } from "./authenticate";
const secret=process.env.JWT_SECRET as string;
import { Response } from "express";

if(!secret){
    throw new Error("secret not defined")
}


export async function createuser(userdetails:usertype) {

    
        const {success}=userschema.safeParse(userdetails);
        if(!success){throw new Error();}
        await pc_client.user.create({
        data:{
            username:userdetails.username,
            password:userdetails.password,
            email:userdetails.email
        }
    })
    
    
    
}

export async function addtodo(tododetails:todotype,userId:number){
    
        const {success}=todoschema.safeParse(tododetails);
    if(!success){throw new Error("doesnot satisfy the requirements");}
    await pc_client.todo.create({
        data:{
            title:tododetails.title,
            description:tododetails.description,
            done:tododetails.done,
            userId:userId
        }
    })
    
}

export async function createtoken(req:{username:string,password:string}){

        const tokenuser= await pc_client.user.findFirst({
        where:{
            username:req.username
        }
    })
    if(tokenuser==null){throw new Error("user not found");}
    if(tokenuser.password!=req.password){throw new Error("password wrong")}
    const token=jwt.sign({username:tokenuser?.username,userId:tokenuser.id},secret);
    return token;
    





}

export async function gettodo(req:AuthRequest,res:Response) {
    try{
        if(!req.user){throw new Error("req user not recieved ");}
    const userid=req.user?.userId;
    const user= await pc_client.user.findFirst({
        where:{
            id:userid
        },
        include:{
            todos:true
        }
    })
    if(!user){throw new Error("got null ")}
    res.json({message:user.todos})

    }
    catch(err:any){
        res.json({
            error:err.message
        })
    }
}