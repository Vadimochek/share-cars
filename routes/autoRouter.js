const Acontroller = require("../controllers/AutoController");
const { authJwt } = require("../middleware");
const { verifyCar } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
  app.get(
    "/autos",
    [authJwt.verifyToken, authJwt.userOrAdmin],
    Acontroller.products
  );
  app.post(
    "/newAuto",
    [authJwt.verifyToken, authJwt.isAdmin],
    Acontroller.addProduct
  );
  app.post(
    "/changeAuto",
    [authJwt.verifyToken, authJwt.isAdmin],
    Acontroller.updateProduct
  );
  app.post(
    "/deleteAuto",
    [authJwt.verifyToken, authJwt.isAdmin, verifyCar.checkBeforeDelete],
    Acontroller.deleteProduct
  );
}