module.exports = (sequelize, Sequelize) => {
    let orders = sequelize.define("orders" , {
        id:{
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false
        },
        userId:{
            type:  Sequelize.INTEGER,
            allowNull: false
        },
        autoId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING
        },
        qrcode:{
            type: Sequelize.STRING
        }
       });
    return orders;
    };
    