const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.send({
          message: "Почта используется"
        });
        return;
      }
      next();
    });
};


const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;