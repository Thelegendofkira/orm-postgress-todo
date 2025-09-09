import { createuser } from "./loginfun";
import express from "express"
import { createtoken } from "./loginfun";
import dotenv from "dotenv"
import { addtodo,gettodo } from "./loginfun";
import { authenticate } from "./authenticate";
import { AuthRequest } from "./authenticate";
import { todotype } from "./zod";
dotenv.config()
const app=express();
app.use(express.json());

app.post("/signup",async(req,res)=>{
     try{
        await createuser(req.body);
     res.json({
        message:"successful"
     })
     }
     catch(err:any){
        res.json({error:err.message})
     }

    
})
app.post("/signin",async(req,res)=>{
   try{
 const token =await createtoken(req.body);
 res.json({token})
   }
   catch(err:any){
        res.json({error:err.message})
     }
})


app.post("/addtodo",authenticate,(req:AuthRequest,res)=>{
    try{
        if(!req.user){throw new Error("did note recieve request user parameter")}
    const userid=req.user.userId;
    const todo:todotype={
        title:req.body.title,
        description:req.body.description,
        done:req.body.done
    }
    addtodo(todo,userid);
    }
    catch(err:any){
        res.json({error:err.message})
    }
})

app.post("/gettodo",authenticate,gettodo)


app.listen(3000);