const ProductService = require("../services/product.service")
const { body } = require('express-validator')
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");



exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('productName'),
                body('merchantId'),
                body('imageUrl'),
                body('price'),
                body('catagory'),
                body('offers'),
                //body('email')
            ]
        }

        case 'update': {
            return [
                body('productName').isString().notEmpty(),
                body('imageUrl'),
                body('price').isString().notEmpty(),
                body('catagory'),
                body('offers'),
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

        const product = await ProductService.create(validatedRequest);

        res.send(product);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getAll = async (req, res) => {
    try {

        const products = await ProductService.findAll();

        res.send(products);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const product = await ProductService.findById(req.params.id)
        res.send(product);
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

        const product = await ProductService.update(req.params.id, validatedRequest);

        res.send(product);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.delete = async (req, res) => {
    try {

        await ProductService.delete(req.params.id);

        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};



