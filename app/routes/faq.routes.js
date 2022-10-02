module.exports = app => {
    const faqController = require("../controllers/faq.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new Customer
    router.post("/", faqController.validate('create'), faqController.create);
  
    // router.get("/", faqController.getAll);
  
    // router.get("/:id", faqController.getById);
  
    // router.delete("/:id", faqController.delete);
  
    app.use('/api/faq', router);
  
  };
  