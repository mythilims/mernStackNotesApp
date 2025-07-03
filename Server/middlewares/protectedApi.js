import jsonToken from "jsonwebtoken";
const mySceretKey = process.env.JWT_SECRET_KEY;
const protectedApi = (req, res, next) => {
  console.log(req.headers);
  let headers = req.headers.authorization;
  console.log(headers);
  if (headers!==undefined &&!headers && headers?.headers.startsWith("Bearer")) {
    return res.status(401).json({ message: "token missing" });
  }

  let decode = headers.split(" ")[1];
  try {
    let token = jsonToken.verify(decode, mySceretKey);
    res.token = token;
    
     next();
  } catch (e) {
    if (jsonToken.JsonWebTokenError) {
      return res.status(401).json({ message: "token not matched" });
    } else if (jsonToken.TokenExpiredError) {
      return res.status(401).json({ message: "token expired" });
    }
    res.status(500).json({ message: "server error",error:e });
  }

};

export default protectedApi;
