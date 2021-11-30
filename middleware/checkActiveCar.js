const db = require("../models");

const order = db.orders;
const auto=db.auto;

const checkBeforeDelete = (req, res, next) => {
    order.findAll({
        where:
        {
            autoId: req.body.autoId,
            status: "Активен"
        }
    }).then(orders => {
      if(orders.length!=0) {
        res.send("Машина находится в активном заказе, подождите завершения или отмены заказа");
        return;
      }
      next();
    });
};

const backRest = (req, res, next) => {
    let USER_ID;
    if (req.body.userId){
    console.log("BODY")
    USER_ID=req.body.userId;
    }
    else{
    USER_ID=req.userId
    console.log("WITHOUT BODY")
    }
    order.findAll({
        where:
        {
            userId: USER_ID,
            status: "Активен"
        }
    }).then(orders => {
    console.log(orders);
    if(orders.length!=0) {
        req.body.autoId=+orders[0].autoId;
        auto.findByPk(orders[0].autoId).then(res=>{
            req.body.rest=res.rest;
            next();
        })
      } 
      else
        next();
    });
};
const verifyCar = {
    checkBeforeDelete: checkBeforeDelete,
    backRest: backRest
};

module.exports = verifyCar;