module.exports = app => {
    const customerUserController = require("../controllers/customerUser.controller");

    var router = require("express").Router();


    // Create a new Customer
    router.post("/", customerUserController.validate('create'), customerUserController.create);

    router.get("/", customerUserController.getAll);

    router.post("/login", customerUserController.validate('login'), customerUserController.login);

    router.get("/:id", customerUserController.getById);

    app.use('/api/customersUsers', router);

};
