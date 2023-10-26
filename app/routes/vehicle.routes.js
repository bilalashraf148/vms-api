const { authJwt } = require("../middleware");
const vehicles = require("../controllers/vehicle.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/vehicles", [authJwt.verifyToken], vehicles.getAll)

  app.post("/api/vehicles", [authJwt.verifyToken], vehicles.create)
};
