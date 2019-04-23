let jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcrypt");

const usersModel = require("./users");

//read private and public key
const privateKey = fs.readFileSync(__dirname + "/jwtRS256.key", "utf8");
const publicKey = fs.readFileSync(__dirname + "/jwtRS256.key.pub", "utf8");

const login = (id, login, password, callback) => {
  const data = findhash(id);
  if (data && data.loginid === login) {
    if (data.pass) {
      bcrypt.compare(password, data.pass, (err, res)=> {
        if (res) {
          jwt.sign(login, privateKey, { algorithm: "RS256" }, function(
            err,
            token
          ) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, token);
            }
          });
        } else {
          callback(err, null);
        }
      });
    } else {
      callback(new Error("id.not.valid"), null);
    }
  } else {
    callback(new Error("login.not.valid"), null);
  }
};

const findhash = id => {
  const user = usersModel.get(id);
  return user ? {pass:user.password,loginid:user.login} : null;
};

const verifyacces = (token, callback) => {
  jwt.verify(token, publicKey, function(err, decoded) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
};

exports.login = login;
exports.verifyacces = verifyacces;
