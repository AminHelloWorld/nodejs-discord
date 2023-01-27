const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      text: {
        type: Sequelize.STRING
      },
      originalText: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', //table name
            key: 'id' //table column
        }
      },
      channelId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'channels', //table name
            key: 'id' //table column
        }
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  
    return Message;
  };
  