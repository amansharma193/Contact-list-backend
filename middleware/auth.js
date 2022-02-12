import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  try {
    var token = req.headers?.authorization?.split(" ")[1];
    let decodedData;
    if(!token)
      token = process.env.token;
    decodedData = jwt.verify(token, secret);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;