const ReviewService = require("../services/review.service")
const { body } = require('express-validator')
const { validationResult } = require('express-validator/check');
const ServiceLayerError = require("../services/Exceptions/service.exceptions");



exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
              
                body('productid'),
                body('description'),
                body('rating')
                
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

        const review = await ReviewService.create(validatedRequest);

        res.send(review);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getAllByProduct = async (req, res) => {
    try {

        const reviews = await ReviewService.findAllByProduct(req.params.productId);

        res.send(reviews);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const review = await ReviewService.findById(req.params.id)
        res.send(review);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

// exports.update = async (req, res) => {
//     try {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             res.status(400).json({ errors: errors.array() });
//             return;
//         }

//         const validatedRequest = req.body

//         const review = await ReviewService.update(req.params.id, validatedRequest);

//         res.send(review);
//     } catch (error) {
//         if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
//         res.status(500).json({ message: error.message })
//     }
// };

exports.delete = async (req, res) => {
    try {

        await ReviewService.delete(req.params.id);

        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};



