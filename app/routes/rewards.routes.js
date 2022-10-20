module.exports = (app) => {
  const rewardsController = require("../controllers/rewards.controller.js");

  var router = require("express").Router();

  // Create a new Customer
  router.post(
    "/",

    rewardsController.create
  );

  // router.get("/", rewardsController.getAll);

  app.use("/api/rewards", router);
};
