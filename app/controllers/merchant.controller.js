const MerchantService = require("../services/merchant.service")
const { body } = require('express-validator/check')
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");

exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('firstName').isString().notEmpty(),
                body('lastName').isString().notEmpty(),
                body('email', 'Invalid email').exists().isEmail().notEmpty(),
                body('address').isString().notEmpty(),
                body('phoneNumber').isInt().notEmpty()
            ]
        }

        case 'update': {
            return [
                body('firstName').isString().notEmpty(),
                body('lastName').isString().notEmpty(),
                body('address').isString().notEmpty(),
                body('phoneNumber').isInt().notEmpty()
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

        const merchant = await MerchantService.create(validatedRequest);

        res.send(merchant);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};


exports.getAll = async (req, res) => {
    try {

        const merchants = await MerchantService.findAll();

        res.send(merchants);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const merchant = await MerchantService.findById(req.params.id)
        res.send(merchant);
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

        const merchant = await MerchantService.update(req.params.id, validatedRequest);

        res.send(merchant);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.delete = async (req, res) => {
    try {

        await MerchantService.delete(req.params.id);

        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};
