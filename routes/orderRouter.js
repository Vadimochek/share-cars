const { authJwt, verifyCar } = require("../middleware");
const { verifyOrder } = require("../middleware");
const Ocontroller = require("../controllers/orderController");
const verify = require("jsonwebtoken/verify");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
  "/addOrder", 
  [authJwt.verifyToken, verifyOrder.checkActiveOrder, verifyOrder.checkFactOrder], 
  Ocontroller.addOrder
  );
  
  app.post("/updateOrder",
  [authJwt.verifyToken, verifyCar.backRest], 
  Ocontroller.updateOrder
  );

  app.post("/admin/updateOrder",
  [authJwt.verifyToken, authJwt.isAdmin], 
  Ocontroller.updateOrder
  );
  // app.post("/deleteOrder",
  // [authJwt.verifyToken], 
  // Ocontroller.deleteOrder
  // );
}