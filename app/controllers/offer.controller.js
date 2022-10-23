const OfferService = require("../services/offer.service")
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");

exports.createBuyGet = async (req, res) => {
    try {
        const validatedRequest = req.body

        const offer = await OfferService.createBuyGet(validatedRequest);

        res.send(offer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
    }
};

exports.createBundle = async (req, res) => {
    try {
        const validatedRequest = req.body

        const offer = await OfferService.createBundle(validatedRequest);

        res.send(offer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
    }
};

exports.getAll = async (req, res) => {
    try {
        const customers = await OfferService.findAll();

        res.send(customers);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const customer = await OfferService.findById(req.params.id)
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

        const customer = await OfferService.update(req.params.id, validatedRequest);

        res.send(customer);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.delete = async (req, res) => {
    try {

        await OfferService.delete(req.params.id);

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

        await OfferService.sendOTP(validatedRequest);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
    }
};

