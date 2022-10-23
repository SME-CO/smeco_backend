module.exports = app => {
    const reviewController = require("../controllers/review.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new Customer
    router.post("/", reviewController.validate('create'), reviewController.create);
  
    router.get("/product/:productId", reviewController.getAllByProduct);
  
    router.get("/:id", reviewController.getById);
  
    //router.put("/:id", reviewController.validate('update'), reviewController.update);
  
    router.delete("/:id", reviewController.delete);
  
    
  
    app.use('/api/reviews', router);
  
  };
  