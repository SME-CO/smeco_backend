const { sequelize, Merchant } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')

const MerchantService = function () { };

MerchantService.create = async (validatedRequest) => {
    try {

        const merchantExists = await Merchant.findOne(
            { where: { email: validatedRequest.email } }
        );

        if (merchantExists) {
            throw new ServiceLayerError("This email already exists")
        }

        const merchant = await Merchant.create({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName,
            email: validatedRequest.email,
            address: validatedRequest.address,
            phoneNumber: validatedRequest.phoneNumber
        });


        await merchant.save();
        return merchant
    } catch (err) {
        throw err
    }
}

MerchantService.findAll = async () => {
    try {

        const merchants = await Merchant.findAll();
        return merchants;
    } catch (err) {
        throw err
    }
}

MerchantService.findById = async (id) => {
    try {

        const merchant = await Merchant.findByPk(id);

        if (!merchant) {
            throw new ServiceLayerError("Object Not Found");
        }

        return merchant;
    } catch (error) {
        throw error;
    }
}

MerchantService.update = async (id, validatedRequest) => {
    try {

        const merchant = await MerchantService.findById(id);

        if (!merchant) {
            throw new ServiceLayerError("Object Not Found");
        }

        merchant.set({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName,
            address: validatedRequest.address,
            phoneNumber: validatedRequest.phoneNumber
        })

        await merchant.save();
        return merchant
    } catch (err) {
        throw err
    }
}

MerchantService.delete = async (id) => {
    try {

        const merchant = await MerchantService.findById(id);

        if (!merchant) {
            throw new ServiceLayerError("Object Not Found");
        }

        await merchant.destroy();
        return
    } catch (err) {
        throw err
    }
}

module.exports = MerchantService;