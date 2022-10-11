module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("orders", {
      staticid: {
        type: Sequelize.STRING
      },
      paytime: {
        type: Sequelize.STRING
      },
      finish: {
        type: Sequelize.BOOLEAN
      },
      orderlist: {
        type: Sequelize.JSON
      },
      category: {
        type: Sequelize.STRING
      }
    });
    return Orders;
  };