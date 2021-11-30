const { authJwt } = require("../middleware");
const Ucontroller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/home", Ucontroller.allAccess);

  app.get("/profile", 
  [authJwt.verifyToken], 
  Ucontroller.profile);

  app.get("/settings", [authJwt.verifyToken], Ucontroller.settings);
  app.post("/changeSettings", [authJwt.verifyToken], Ucontroller.changeSettings);
  app.get("/admin/autos", [authJwt.verifyToken, authJwt.isAdmin], Ucontroller.adminViewAuto);
  app.get("/admin/add", [authJwt.verifyToken, authJwt.isAdmin], Ucontroller.adminAdd);
  app.get("/admin/orders", [authJwt.verifyToken, authJwt.isAdmin], Ucontroller.adminViewOrders);
  
  app.get("/", function (req, res){
    res.redirect("/home");
  });
}
