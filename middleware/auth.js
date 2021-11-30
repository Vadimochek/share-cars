const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.redirect("/refreshtoken");
  }
  return res.redirect("/home");
}

const logined = (req, res, next) =>{
  const token=req.cookies["access_token"];
  if(token)
    return res.redirect("/autos")
  else
    next();
}

const userOrAdmin = (req, res, next) =>{
  const token=req.cookies["access_token"];
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          return res.redirect("/admin/autos")
        }
      }
      next()
    });
    });
}

const verifyToken = (req, res, next) => {
  const token = req.cookies["access_token"];
  if (!token) {
    return res.redirect("/home");
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.send({
        message: "Требуются права администратора"
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  logined: logined,
  userOrAdmin: userOrAdmin
};

module.exports = authJwt;