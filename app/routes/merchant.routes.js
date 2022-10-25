module.exports = app => {
    const merchantController = require("../controllers/merchant.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new Merchant
    router.post("/", merchantController.validate('create'), merchantController.create);

    router.post("/upload/cover/:merchantId", merchantController.uploadCover);
  
    router.get("/", merchantController.getAll);
  
    router.get("/:id", merchantController.getById);
    
    router.get("/shopAddress/:Location", merchantController.getByLocation);
  
    router.put("/:id", merchantController.validate('update'), merchantController.update);
  
    router.delete("/:id", merchantController.delete);

    router.post("/login", merchantController.validate('login'), merchantController.login);
  
    app.use('/api/merchants', router);
  
  };