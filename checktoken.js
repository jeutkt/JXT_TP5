let loggerModel = require("./model/idp");
module.exports = function(req, res, next) {
  if (req.originalUrl === "/v1/auth/login") {
    next();
  } else {
    let token = req.header("Authorization");
    if (!token) {
      res.status(401).json({
        message: "unauthorized"
      });
    } else {
      token = token.replace("bearer ", "");
      loggerModel.verifyacces(token, (err, result) => {
        if (err) {
          res.status(401).json({
            message: "unauthorized"
          });
        } else {
          next();
        }
      });
    }
  }
};
