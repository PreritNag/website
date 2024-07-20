const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userroutes=require("./router/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const app=express();
const PORT=3000;
mongoose.connect("mongodb://localhost:27017/website").then((e)=>{
    console.log("database connected");
});
app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.get("/",(req,res)=>{
    res.render("home",{user:req.user});
});

app.use("/user",userroutes);
app.listen(PORT,()=>console.log(`server started at ${PORT}`))
