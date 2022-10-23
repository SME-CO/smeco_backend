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


FaqService.findAll = async () => {
    try {

        const faq = await Faq.findAll();
        return faq;
    } catch (err) {
        throw err
    }
}

FaqService.findById = async (id) => {
    try {

        const faq = await Faq.findByPk(id);

        if (!faq) {
            throw new ServiceLayerError("Object Not Found");
        }

        return faq;
    } catch (error) {
        throw error;
    }
}


module.exports = FaqService;
