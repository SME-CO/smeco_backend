module.exports = app => {
  const customerController = require("../controllers/customer.controller.js");

  var router = require("express").Router();


  // Create a new Customer
  router.post("/", customerController.validate('create'), customerController.create);

  router.get("/", customerController.getAll);

  router.get("/:id", customerController.getById);

  router.put("/:id", customerController.validate('update'), customerController.update);

  router.delete("/:id", customerController.delete);

  app.use('/api/customers', router);

};
