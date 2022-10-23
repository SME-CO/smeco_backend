module.exports = app => {
    const offerController = require("../controllers/offer.controller.js");
  
    var router = require("express").Router();
  
  
    router.post("/buyGet", offerController.createBuyGet);

    router.post("/bundle", offerController.createBundle);
  
  
    app.use('/api/offers', router);
  };
  