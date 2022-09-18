const FaqService = require("../services/faq.service")
const { body } = require('express-validator')
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");



exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('message')
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

        const faqResponse = await FaqService.create(validatedRequest);

        res.send(faqResponse);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ error: error, message: error.message, code: 400 })
        res.status(500).json({ error: error, message: error.message, code: 500 })
    }
};








