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

exports.getByMerchant = async (req, res) => {
    try {
        const products = await ProductService.findByMerchant(req.params.id)
        res.send(products);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getByCategory = async (req, res) => {
    try {
        const product = await ProductService.findByCategory(req.params.category)
        res.send(product);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getByCategoryAndMerchant = async (req, res) => {
    try {
        const product = await ProductService.findByCategoryAndMerchant(req.params.category, req.params.merchant)
        res.send(product);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.checkout = async (req, res) => {
    try {

        const validatedRequest = req.body

        const product = await ProductService.createPurchase(validatedRequest);

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

exports.uploadImage = async (req, res) => {
    try {
        const newpath = 'D:/smeco_customer_app/public/discount/';
        const file = req.files.file;
        const filename = new Date().valueOf() + file.name;

        console.log(newpath, filename);

        file.mv(`${newpath}${filename}`, (err) => {
            if (err) {
                res.status(500).send({ message: "File upload failed", code: 200 });
            }
            const productId = req.params.productId;
            const response = ProductService.addImageUrl(productId, filename);

            res.status(200).send({ message: "File Uploaded", code: 200 });
        });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
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



