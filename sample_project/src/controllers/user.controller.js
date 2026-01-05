const userService = require("../services/user.service");

async function  createUser (req, res) {
  
  const {username,password,role,name,email,phone,address} = req.body

  if( !(username && password && role && name && email && phone && address)){
    res.status(400).json({status:false,msg:'All fields are mandatory',data:{username,password,role,name,email,phone,address}})
  }
  try {
    const existingUser = await userService.checkUser(username,email,phone)
    console.log(existingUser)
    if(existingUser.length){
     res.json({status:false ,msg:"User alredy exist",data:res});
    }
    const res = await userService.createUser(username,password,role,name,email,phone,address);
     console.log(res)
    res.json({status:true ,msg:"User added successfully",data:res});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {createUser}