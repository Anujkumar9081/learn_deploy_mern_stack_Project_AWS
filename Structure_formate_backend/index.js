const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const bcryptjs = require("bcryptjs");      
const jwt = require("jsonwebtoken");       
const crypto = require("crypto");           

const signup = require("./routers/Signup");
app.use("/signup" , signup);

const data = require("./database/db");



app.listen(3000 , ()=>{
  console.log("server is running");
  
})