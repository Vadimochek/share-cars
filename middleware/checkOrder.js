const db = require("../models");

// ПОПРОБОВАТЬ ЗДЕСЬ

const order = db.orders;
const fact=db.fact;
const auto=db.auto;

const checkActiveOrder = (req, res, next) => {
    order.findAll({
        where:
        {
            userId: req.userId,
            status: "Активен"
        }
    }).then(orders => {
      if(orders.length!=0) {
        console.log(orders!=[]);
        res.send("У Вас уже есть активный заказ");
        return;
      }
      next();
    });
};

const checkFactOrder = (req, res, next) => {
  auto.findByPk(req.body.autoId).then(auto=>{
    req.body.rest=auto.rest;
  })
  fact.findOne({
    where: {
      userId: req.userId
    }
  }).then(facts => {
    if( !facts || facts.license_number==null || facts.license_category==null || facts.date==null) {
      res.send("Перед оформлением заказа заполните данные водительских прав");
      return;
    }
    console.log(facts.license_category);
    if(!facts.license_category.includes(req.body.category)){
      res.send("Ваше водительское удостоверение не подходит к категории данного транспортного средства");
      return;
    }
    next();
  });
};

const verifyOrder = {
    checkActiveOrder: checkActiveOrder,
    checkFactOrder: checkFactOrder
};

module.exports = verifyOrder;