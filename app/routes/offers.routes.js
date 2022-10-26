module.exports = app => {
    const offerController = require("../controllers/offer.controller.js");
  
    var router = require("express").Router();
  
  
    router.post("/buyGet", offerController.createBuyGet);

    router.post("/bundle", offerController.createBundle);

    router.get("/buyGet/:merchantId", offerController.getBuyGetByMerchant);

    router.get("/bundle/:merchantId", offerController.getBundleByMerchant);
  
    app.use('/api/offers', router);
  };
  