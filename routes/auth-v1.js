const express = require("express");
const router = express.Router();

let loggerModel = undefined;

router.post("/login", (req, res) => {
  const id = req.body.id;
  const login = req.body.login;
  const password = req.body.password;
  if (id && login && password) {
    loggerModel.login(id, login, password, (err, result) => {
      if (result) {
        res.status(200).json({
          message: `ok`,
          tokenaccess: result
        });
      } else {
        res.status(401).json({
          message: `unauthorized`
        });
      }
    });
  } else {
    res.status(401).json({
      message: "unauthorized"
    });
  }
});

router.get("/verifyaccess", (req, res) => {
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
        res.status(200).json({
          message: "ok",
          tokenaccess: result
        });
      }
    });
  }
});

module.exports = model => {
  loggerModel = model;
  return router;
};
