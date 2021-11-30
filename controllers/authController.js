const db = require("../models");
const config = require("../config/auth.config");
const cookieParser = require("cookie-parser");
// const Cookies = require("universal-cookie");
const { user: User, role: Role, refreshToken: RefreshToken, fact: Fact } = db;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.authorization = (req, res) => {
  res.render("signin");
};
exports.registration = (req, res) => {
  res.render("signup");
};
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone
  })
    .then(user => {
        user.setRoles([1]);
    })
    .catch(err => {
      return res.send("Ошибка. Попробуйте ещё раз!");
    });
    return res.send({ success: "added"});
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.send("Пользователь не найден");//не найден
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.send("Неправильный пароль");//Password incorrect
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);
        res.cookie("access_token", token);
        res.cookie("refresh_token", refreshToken);
        return res.send({ success: "logged"});
    })
    .catch(err => {
      return res.send("Ошибка. Попробуйте ещё раз");
    });
};
exports.logout = (req, res) => {
  cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    return res.redirect('/');
}

  exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.cookies["refresh_token"];
  
  if (requestToken == null) {
    return res.redirect("/sign");
  }
  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      return res.redirect("/sign");
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    res.cookie("access_token", newAccessToken);
    return res.redirect('/autos')
  } catch (err) {
    return res.send({ message: err });
  }
};