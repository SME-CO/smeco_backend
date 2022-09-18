const { sequelize, Faq } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')


const FaqService = function () { };


FaqService.create = async (validatedRequest) => {
    try {

        const FaqExists = await Faq.findOne(
            { where: { message: validatedRequest.message } }
        );
        

        if (FaqExists) {
            throw new ServiceLayerError("This question already exists");
        }

    
        const faq = await Faq.create({
            message: validatedRequest.message
        });


        await faq.save();
        return faq
    } catch (err) {
        throw err
    }
}


module.exports = FaqService;
