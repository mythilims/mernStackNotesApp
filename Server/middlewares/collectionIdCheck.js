import mongoose from "mongoose"
const isValidId = (req,res,next)=>{    
      if(!mongoose.Types.ObjectId.isValid(req.params.id)){
       res.status(404).json({error:'id not found'})
      }
      next()
}

export default isValidId;