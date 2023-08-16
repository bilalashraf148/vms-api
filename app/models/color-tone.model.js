module.exports = (sequelize, Sequelize) => {
  return sequelize.define("colorTones", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    color: {
      type: Sequelize.STRING,
    },
    tone: {
      type: Sequelize.STRING,
    },
    shade: {
      type: Sequelize.BLOB("long"),
    },
  }); 
};
