import jwt from "jsonwebtoken";
// authentication middleware which will verify user token
const auth = async (req, res, next) => {

  // getting scret key from environment for token verification
  const secret = process.env.SECRET_KEY;
  try {

    // extractng token from headers (if present otherwise will get from env) 
    var token = req.headers?.authorization?.split(" ")[1] || process.env.token;
    // token verification and data extraction from token
    let decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    // moving to our main request after token verification
    next();
  } catch (error) {
    // exception is thrown in case of invalid token which we deal here currently only printing error details
    console.log(error);
  }
};

export default auth;