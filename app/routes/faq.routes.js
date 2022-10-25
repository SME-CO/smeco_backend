module.exports = (app) => {
  const faqController = require("../controllers/faq.controller.js");

  var router = require("express").Router();

  router.post("/", faqController.validate("create"), faqController.create);

  router.get("/", faqController.getAll);

  router.get("/:id", faqController.getById);

  router.put("/:id", faqController.update);

  app.use("/api/faq", router);
};
