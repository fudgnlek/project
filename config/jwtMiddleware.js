const jwt = require("jsonwebtoken");
const secret_config = require("./secret");

const jwtMiddleware = async function (req, res, next) {
  //console.log("a");
  // read the token from header or url
  const token = req.headers["x-access-token"] || req.query.token;
  // token does not exist
  //const {token} = req.headers;
  //console.log("jwtMiddele "+token); 
  //여기까지 확인 !!
  if (!token) {
    return res.status(403).json({
      isSuccess: false,
      code: 403,
      message: "로그인이 되어 있지 않습니다.",
    });
  }
  try {
    const verifiedToken = jwt.verify(token, secret_config.jwtsecret);
    req.verifiedToken = verifiedToken;
    next();
  } catch {
    res.status(403).json({
      isSuccess: false,
      code: 403,
      message: "검증 실패",
    });
  }
};

module.exports = jwtMiddleware;