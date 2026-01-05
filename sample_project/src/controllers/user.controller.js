const userService = require("../services/user.service");

async function  createUser (req, res) {
  
  const {username,password,role,name,email,phone,address} = req.body

  if( !(username && password && role && name && email && phone && address)){
    res.status(400).json({status:false,msg:'All fields are mandatory',data:{username,password,role,name,email,phone,address}})
  }
  try {
    const existingUser = await userService.checkUser(username,email,phone)
    if(existingUser.length){
     res.json({status:false ,msg:"User alredy exist",data:existingUser});
    }else{
      const response = await userService.createUser(username,password,role,name,email,phone,address);
     console.log(response)
    res.json({status:true ,msg:"User added successfully",data:response});
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
async function  authenticateUser (req, res) {
  const {username,password} = req.body

  try{
   const result = await userService.authUser(username,password)
   if(result.length){
 res.json({status:true ,msg:"login successfully",data:result});
   }else{
      res.status(401).json({status:false ,msg:"Invalid credentials",});
   }
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function  getUser (req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.getUser(userId)
    if(result.length){
res.status(200).json({status:true ,msg:"user fetch successfully",data:result});
    }else{
      res.status(404).json({status:false ,msg:"user not found",});
    }
  } catch (error) {
     res.status(500).json({ error: err.message });
  }
}


module.exports = {createUser,authenticateUser,getUser}