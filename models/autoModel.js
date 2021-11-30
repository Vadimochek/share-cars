module.exports = (sequelize, Sequelize) => {
    let auto = sequelize.define("auto" , {
        id:{
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false
        },
        brand:{
            type:  Sequelize.STRING 
        },
        model: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.STRING
        },
        picture:{
            type: Sequelize.STRING
        },
        rest:{
            type: Sequelize.INTEGER
        }
       });
    return auto;
    };
    