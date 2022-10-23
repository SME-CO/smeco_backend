const { sequelize, Review } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')


const ReviewService = function () { };

ReviewService.create = async (validatedRequest) => {
    try {

        

        const review = await Review.create({
            priductid: productId,
            description: validatedRequest.description,
            reting: validatedRequest.reting
            
        });


        await review.save();
        return review
    } catch (err) {
        throw err
    }
}

ReviewService.findAllByProduct = async (productId) => {
    try {
         const reviews = await Review.findAll(
            { where: { productid: productId } }
         );

        //const reviews = await Review.findAll(id);
        return reviews;
    } catch (err) {
        throw err
    }
}

ReviewService.findById = async (id) => {
    try {

        const reviews = await Review.findByPk(id);

        if (!reviews) {
            throw new ServiceLayerError("Object Not Found");
        }

        return reviews;
    } catch (error) {
        throw error;
    }
}

ReviewService.update = async (id, validatedRequest) => {
    try {

        const review = await ReviewService.findById(id);

        if (!review) {
            throw new ServiceLayerError("Object Not Found");
        }

        review.set({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName
        })

        await review.save();
        return review
    } catch (err) {
        throw err
    }
}

ReviewService.delete = async (id) => {
    try {

        const review = await ReviewService.findById(id);

        if (!review) {
            throw new ServiceLayerError("Object Not Found");
        }

        await review.destroy();
        return
    } catch (err) {
        throw err
    }
}

module.exports = ReviewService;
