const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const pug = require("pug");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
var corsOptions = {
    origin: "http://localhost:8081"
   };
app.set("view engine", "pug");
app.use("/dist", express.static(__dirname + "/dist"));
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser('veryhardpassword'))
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/authRouter')(app);
require('./routes/userRouter')(app);
require('./routes/autoRouter')(app);
require('./routes/orderRouter')(app);

const db = require("./models");


db.sequelize.sync()

app.listen(5555);




const Role = db.role;

function initial() {
    Role.create({
    id : 1,
    name : "user"
    });
    
    Role.create({
    id: 2,
    name: "admin"
    });
   }



// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
//     initial();
//    });