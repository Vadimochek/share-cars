const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/sign", [authJwt.logined], controller.authorization);
  app.get("/registration", [authJwt.logined], controller.registration);

  app.get("/refreshtoken", controller.refreshToken);
  app.post("/signin", controller.signin);
  app.get("/logout", controller.logout);
  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateEmail
    ],
    controller.signup
  );
};