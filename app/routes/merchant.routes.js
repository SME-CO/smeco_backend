module.exports = app => {
    const merchantController = require("../controllers/merchant.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new Merchant
    router.post("/", merchantController.validate('create'), merchantController.create);
  
    router.get("/", merchantController.getAll);
  
    router.get("/:id", merchantController.getById);
  
    router.put("/:id", merchantController.validate('update'), merchantController.update);
  
    router.delete("/:id", merchantController.delete);
  
    app.use('/api/merchants', router);
  
  };