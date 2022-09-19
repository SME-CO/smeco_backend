module.exports = app => {
    const productController = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new product
    router.post("/", productController.validate('create'), productController.create);
  
    router.get("/", productController.getAll);

    router.get("/categories/:category", productController.getByCategory);
  
    router.get("/:id", productController.getById);
  
    router.put("/:id", productController.validate('update'), productController.update);
  
    router.delete("/:id", productController.delete);
  
    //router.post("/sendOTP", productController.validate('sendOTP'), productController.sendOTP);
  
    app.use('/api/products', router);
  
  };
  