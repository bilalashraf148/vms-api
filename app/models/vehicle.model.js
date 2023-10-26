module.exports = (sequelize, Sequelize) => {
  return sequelize.define("vehicles", {
    registration: {
      type: Sequelize.STRING
    },
    make: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    variant: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    bankName: {
      type: Sequelize.STRING
    },
  });
};
