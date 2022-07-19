const CustomerService = require("../services/customer.service")
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");



exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('firstName').isString().notEmpty(),
                body('lastName').isString().notEmpty(),
                body('email', 'Invalid email').exists().isEmail().notEmpty()
            ]
        }

        case 'update': {
            return [
                body('firstName').isString().notEmpty(),
                body('lastName').isString().notEmpty()
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

        const customer = await CustomerService.create(validatedRequest);

        res.send(customer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getAll = async (req, res) => {
    try {

        const customers = await CustomerService.findAll();

        res.send(customers);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const customer = await CustomerService.findById(req.params.id)
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

        const customer = await CustomerService.update(req.params.id, validatedRequest);

        res.send(customer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.delete = async (req, res) => {
    try {

        await CustomerService.delete(req.params.id);

        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

