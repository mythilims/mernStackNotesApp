import Users from "../models/userModal.js";

async function validateRegister(req, res, next) {
  const { username, password, email } = req.body;
  try {
    if (!username || !password === "" || !email === "") {
      return res.status(400).json({ error: "All fields required" });
    }
    next();
  } catch (e) {
    res.status(500).json("server error in middleware");
  }
}
async function checkEmailExists(req, res, next) {
  const { email } = req.body;
  let isExisted = await Users.find({ email });
    console.log(isExisted,'fffff');

  try {
    if (isExisted.length>0) {
      return res.status(400).json({error:"this user already register",message:'this user already register',success:false});
    }
    next();
  } catch (e) {
    res.status(500).json("server error in middleware");
  }
}

export default {
    checkEmailExists,
    validateRegister
}