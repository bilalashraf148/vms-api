const pad = require("pad")

module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicles", {
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

  Vehicle.beforeCreate(vehicle => {
    if(vehicle.registration) {
      const splittedRegistrationNumber = vehicle.registration.split("-");
      if(splittedRegistrationNumber.length === 1) {
        return vehicle.registration;
      }
      else {
        const lastIndex = splittedRegistrationNumber.length - 1;
        splittedRegistrationNumber[lastIndex] = pad(4, splittedRegistrationNumber[lastIndex], "0");
        vehicle.registration = splittedRegistrationNumber.join("-");
      }
    }
  });
  return Vehicle;
};
