import Users from "../models/userModal.js";

export const userRegesiter =async (req, res, next) => {
   
    const { body } = req;
    const user = new Users({
      username: body.username,
      password: body.password,
      email: body.email,
    });
    try {
      await user.save();
      res.status(200).json({success:true,message:"user register successfull",email:user.email,password:user.plainPassword,id:user._id});
    } catch (e) {
  if (e.name === "ValidationError") {
    let errors = {};
    for (let field in e.errors) {
      errors[field] = e.errors[field].message;
    }
    return res.status(400).json({ errors ,success:false});
  }
      return res.status(500).json({ e,success:false });

}
  }

  export const userLoing = async(req,res)=>{
    const {email,password} =req.body;
    const user =await Users.findOne({email});
    if(!user){
        return res.status(404).json({error:'User not found',success:false,})
    }
    const isMatch = await user.comparePassword(password);    
    if(!isMatch){
      return  res.status(400).json({error:'invalid credential',success:false})
    }
    
    try{
     const token =await user.generateToken();
     console.log(token,'token');
     
    res.status(200).json({message:'Login scucessful',success:true,error:'',token,userDetails:{username:user.username,email:user.email,id:user._id}})
    }catch(e){
        res.status(500).json({message:'',success:false,error:'server error'})
    } 
}
