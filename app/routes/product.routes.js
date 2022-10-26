module.exports = app => {
    const productController = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new product
    router.post("/", productController.validate('create'), productController.create);

    router.post("/upload/image/:productId", productController.uploadImage);
  
    router.get("/", productController.getAll);

    router.get("/categories/:category", productController.getByCategory);

    router.get("/categories/:category/:merchant", productController.getByCategoryAndMerchant);
  
    router.get("/:id", productController.getById);

    router.post("/purchase/checkout", productController.checkout);

    router.get("/merchant/:id", productController.getByMerchant);
  
    router.put("/:id", productController.validate('update'), productController.update);
  
    router.delete("/:id", productController.delete);

    router.get("/purchased/:customerId", productController.getAllPurchased);
  
    //router.post("/sendOTP", productController.validate('sendOTP'), productController.sendOTP);
  
    app.use('/api/products', router);
  
  };
  