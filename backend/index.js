const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const bcryptjs = require("bcryptjs");       // use for to secure the password by convert into sting 
const jwt = require("jsonwebtoken");         // user has already logged in , give them somthing that proves their identity;

const { sendEmail } = require("./nodemailer.js");
const {auth} = require("./auth.js")
const user = require("./database/db.js");

const crypto = require("crypto");            // in buid in the node use for create the random string 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/signup", async (req, res) => {
  try{
    let { name, email, password } = req.body;
  let check_email = await user.findOne({ email }); 
  if (check_email) {
    return res.send("email id already registered");
  }
  let crypted_password = await bcryptjs.hash(String(password), 10);
  const add_user = new user({
    name,
    email,
    password: crypted_password
  });

  
  await add_user.save();
  res.send("user id created");
  }
  catch(err){
console.log(err);
return res.send("something is worng in the serrver")

  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  try{
    const { anuj , email, password } = req.body;
  const check_email = await user.findOne({ email });
  if (!check_email) {
    return res.send("user ID not registered");
  }
  const check_password = await bcryptjs.compare(
    String(password),
    check_email.password
  );
  if (!check_password) {
    return res.send("password is wrong");
  }
  const token = jwt.sign(
    { userId: check_email._id },
    "strickey"
  );
  res.send({"message":"login sucessfully" , token});
  }
  catch(err){
    console.log(err);
    
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/me", auth, async (req, res) => {
const check_user = await user.findById(req.user.userId,{name: 1,email: 1,role: 1,_id: 0});
  if (!check_user) {
    return res.status(404).send("User not found");
  }
  res.send(check_user);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/forget_password" , async (req , res)=>{
  const {email} = req.body;
  const check_email = await user.findOne({email})
  if(!check_email){
    return res.send("email is not resgisted")
  }

 const restartToken = crypto.randomBytes(20).toString('hex');

check_email.resetToken = restartToken;
check_email.resetTokenExpiry = new Date(Date.now() + 3600000);

await check_email.save();

const resetUrl = `http://localhost:5173/reset-password/${restartToken}`;

await sendEmail(
  check_email.email,
  'Password Reset Request',
  `Click the link below to reset your password:\n\n${resetUrl}`
);
 
    res.status(200).send('Password reset email sent');

})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/api/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const check_user = await user.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!check_user) {
    return res.status(400).send("invalid...");
  }

  const crypted_password = await bcryptjs.hash(String(password), 10);

  check_user.password = crypted_password;
  await check_user.save();

  res.send("Password reset successfully");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/error" , (req ,res)=>{

  try{
    let user = null;
    console.log(user.name);
    console.log("hehehe");
    console.log("hello");
    
  }
  catch(err){
    res.send("erororr" , err);
  }
})

app.listen(3000, () => {
  console.log("server is running");
});



// {
//   "name":"anuj yadav 90",
//   "email":"anujkumar9081anu@gmail.com",
//   "password":"121"
// }