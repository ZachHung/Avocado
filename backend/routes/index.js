const Products = require("../models/Products");
const Address = require("../address.json");

function route(app) {
  app.get("/api/product", (req, res, next) => {
    Products.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  });
  app.get("/api/product/:id", (req, res, next) => {
    Products.findById(req.params.id)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  });
  // app.get("/api/address/:id", (req, res, next) => {
  //   Products.findById(req.params.id)
  //     .then((data) => res.json(data))
  //     .catch((err) => res.status(500).json(err));
  // });
  app.get("/api", (req, res) => {
    res.send("API");
  });
}
module.exports = route;
