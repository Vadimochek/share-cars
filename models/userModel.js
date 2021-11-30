
module.exports = (sequelize, Sequelize) => {
let user = sequelize.define("user" , {
    id:{
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false
    },
    username:{
        type:  Sequelize.STRING 
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }

   });
return user;
};
