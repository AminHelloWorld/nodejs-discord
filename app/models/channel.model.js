module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define("channel", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });
  
    return Channel;
  };
  