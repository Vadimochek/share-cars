const db = require("../models");
const bcrypt = require("bcryptjs");
  
const user = db.user; 
const fact = db.fact;
const product = db.auto;
const orderes=db.orders;

let factExist;

  exports.allAccess = (req, res) => {
    res.render("home");
  };

  exports.profile = (req, res) => {
    let flag=true;
    user.findByPk(req.userId, {include: [fact]}).then(user =>{
      user.getAutos().then(autos=>{
        if(!user.fact){
          flag=false;
        }
        res.render("profile", {user, autos, flag});
      })
      // console.log(user);
      });
  };
  exports.settings = (req, res) =>{
    user.findByPk(req.userId, {include: [fact]}).then(user =>{
        if(user.fact==null) factExist=false;
        else factExist=true;
        res.render("settings", {user});
      });
      // console.log(user);
  }

  exports.changeSettings = (req, res) => {
    if (req.body.password){
    user.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone
      },
      {
        where: {
        id: req.userId
      }
    }).catch(err => {
      console.log(err)
    })
  }
  else { 
    user.update(
      {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone
      },
      {
        where: {
        id: req.userId
      }
    }).catch(err => {
      console.log(err)
    })
  }
  if(!factExist){
    fact.create(
      {
          userId: req.userId,
          license_category: req.body.category,
          license_number: req.body.number,
          date: req.body.date 
      }
    ).catch(err =>{
      console.log(err)
    })
  }
  else{
    fact.update(
      {
        license_category: req.body.category,
        license_number: req.body.number,
        date: req.body.date
      },
      {
        where: {
        userId: req.userId
      }
    }).catch(err =>{
      console.log(err)
    })
  }
    return res.send({ success: "updated"});
  }

  exports.adminAdd = (req, res) =>{
    res.render("adminAddAuto")
  }
  exports.adminViewAuto = (req, res) => {
      product.findAll({raw: true}).then(product =>{
      res.render("adminViewAuto", { products : product});
      });
  }
  exports.adminViewOrders = (req, res) => {
      orderes.findAll({raw: true}).then(order =>{
      res.render("adminViewOrders", {orders : order});
      });
  }