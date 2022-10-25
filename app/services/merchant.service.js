const { sequelize, Merchant } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const MerchantService = function () { };

MerchantService.create = async (validatedRequest) => {
    try {

        const merchantExists = await Merchant.findOne(
            { where: { email: validatedRequest.email } }
        );

        if (merchantExists) {
            throw new ServiceLayerError("This Email already exists")
        }

        const salt = await bcrypt.genSalt(10);

        const merchant = await Merchant.create({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName,
            shopName: validatedRequest.shopName,
            shopMobile: validatedRequest.shopMobile,
            shopAddress: validatedRequest.shopAddress,
            email: validatedRequest.email,
            phoneNumber: validatedRequest.phoneNumber,
            password : await bcrypt.hash(validatedRequest.password, salt)
        });


        await merchant.save();
        return merchant
    } catch (err) {
        throw err
    }
}

MerchantService.login = async (validatedRequest) => {
    try {

        const merchant = await Merchant.findOne(
            { where: { email: validatedRequest.email } }
        );

        if (!merchant) {
            throw new ServiceLayerError("This email does not exists");
        }

        const password_valid = await bcrypt.compare(validatedRequest.password, merchant.password);

        if (password_valid) {
            plan_merchant_object = {
                id: merchant.id,
                firstName: merchant.firstName,
                lastName: merchant.lastName,
                mobile: merchant.mobile,
                email: merchant.email
            }

            let response = {
                'token' : token = jwt.sign(plan_merchant_object, process.env.SECRET),
                'user' : merchant,
                'role' : 'merchant'
            } 

            return response;
        } else {
            throw new ServiceLayerError("Entered password is incorrect");
        }

    } catch (error) {
        throw error;
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
MerchantService.findByLocation = async (Location) => {
    try {

        const merchant = await Merchant.findAll(
            { where: { shopAddress: Location} }
        );

    
        
      
        

        return merchant;
    } catch (error) {
        throw error;
    }
}

MerchantService.addCoverImageUrl = async (id, filename) => {
    try{
        const merchant = await MerchantService.findById(id);

        if (!merchant) {
            throw new ServiceLayerError("Object Not Found");
        }
        
        merchant.set({
           shopImage : filename
        })

        await merchant.save();
        return merchant;
    }catch(err){
        throw err;
    }
}

module.exports = MerchantService;