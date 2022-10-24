module.exports = app => {
    const notificationController = require("../controllers/notification.controller.js");
  
    var router = require("express").Router();
  
  
 
  
    router.get("/", notificationController.getAll);
  
    router.get("/:id", notificationController.getById);
  
    app.use('/api/notifications', router);
  
  };
  