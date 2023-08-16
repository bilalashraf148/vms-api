const { authJwt } = require("../middleware");
const productColorTone = require("../controllers/product-color-tone.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/product/create", [authJwt.verifyToken], productColorTone.create);
  app.get("/api/product/getAll", [authJwt.verifyToken], productColorTone.getAll);
};
