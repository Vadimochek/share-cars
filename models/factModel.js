module.exports = (sequelize, Sequelize) => {
    let fact = sequelize.define("fact" , {
        userId:{
            type:  Sequelize.INTEGER,
            allowNull: false
        },
        license_category: {
            type: Sequelize.STRING
        },
        license_number: {
            type: Sequelize.INTEGER
        },
        date:{
            type: Sequelize.DATEONLY
        }
       });
    return fact;
    };
    