const CustomerUserService = require("../services/customerUser.service")
const { body } = require('express-validator')
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");



exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('firstName'),
                body('lastName'),
                body('email'),
                body('password'),
                body('mobile')
            ]
        }

        case 'login': {
            return [
                body('email'),
                body('password'),
            ]
        }

        case 'sendOTP': {
            return [
                body('mobile').isString().notEmpty(),
            ]
        }
    }
}


exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const validatedRequest = req.body

        const customer = await CustomerUserService.create(validatedRequest);

        res.send(customer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const validatedRequest = req.body

        const responseData = await CustomerUserService.login(validatedRequest);

        res.send(responseData);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
    }
};

exports.getAll = async (req, res) => {
    try {

        const customers = await CustomerUserService.findAll();

        res.send(customers);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const customer = await CustomerUserService.findById(req.params.id)
        res.send(customer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const validatedRequest = req.body

        // const customer = await CustomerUserService.update(req.params.id, validatedRequest);

        res.send(customer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.delete = async (req, res) => {
    try {

        // await CustomerUserService.delete(req.params.id);

        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.sendOTP = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const validatedRequest = req.body

        // await CustomerUserService.sendOTP(validatedRequest);

        res.status(200);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

