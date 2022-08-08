const { sequelize, Customer, VerifiedCustomerNumbers } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')
const smsAPI = require('../external_services/smsAPI');

const CustomerService = function () { };

CustomerService.sendOTP = async (validatedRequest) => {
    try {

        const existingNumber = await VerifiedCustomerNumbers.findOne(
            { where: { mobile: validatedRequest.mobile } }
        );

        let otp = null;

        if (existingNumber) {
            if (existingNumber.isVerified) {
                throw new ServiceLayerError("OTP Already verified");
            } else {
                otp = Math.floor(100000 + Math.random() * 900000)
                // await smsAPI.sendSMS(validatedRequest.mobile, `WELCOME TO SMECO                 Your OTP is ${otp}`);
                console.log(otp);

                existingNumber.set({
                    otp: otp,
                    timestamp: Date.now()
                });

                await existingNumber.save();
            }
        } else {

            otp = Math.floor(100000 + Math.random() * 900000)

            await VerifiedCustomerNumbers.create({
                merchant_id: 1,
                mobile: validatedRequest.mobile,
                isVerified: false,
                otp: otp,
                timestamp: Date.now()
            })

            // await smsAPI.sendSMS(validatedRequest.mobile, `WELCOME TO SMECO                        Your OTP is ${otp}`);
        }
    } catch (err) {
        throw err
    }
}

CustomerService.create = async (validatedRequest) => {
    try {

        const customerExists = await Customer.findOne(
            { where: { mobile: validatedRequest.mobile } }
        );

        if (customerExists) {
            throw new ServiceLayerError("This customer already exists");
        }

        const existingNumber = await VerifiedCustomerNumbers.findOne(
            { where: { mobile: validatedRequest.mobile } }
        );

        if (!existingNumber) {
            throw new ServiceLayerError("OTP not verified");
        }

        if (validatedRequest.otp === existingNumber.otp) {

            existingNumber.set({
                isVerified: true,
            });

            await existingNumber.save();
        } else {
            throw new ServiceLayerError("OTP Is Incorrect");
        }

        const customer = await Customer.create({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName,
            mobile: validatedRequest.mobile,
            nic: validatedRequest.nic,
            email: validatedRequest.email
        });


        await customer.save();
        return customer
    } catch (err) {
        throw err
    }
}

CustomerService.findAll = async () => {
    try {

        const users = await Customer.findAll();
        return users;
    } catch (err) {
        throw err
    }
}

CustomerService.findById = async (id) => {
    try {

        const customer = await Customer.findByPk(id);

        if (!customer) {
            throw new ServiceLayerError("Object Not Found");
        }

        return customer;
    } catch (error) {
        throw error;
    }
}

CustomerService.update = async (id, validatedRequest) => {
    try {

        const customer = await CustomerService.findById(id);

        if (!customer) {
            throw new ServiceLayerError("Object Not Found");
        }

        customer.set({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName
        })

        await customer.save();
        return customer
    } catch (err) {
        throw err
    }
}

CustomerService.delete = async (id) => {
    try {

        const customer = await CustomerService.findById(id);

        if (!customer) {
            throw new ServiceLayerError("Object Not Found");
        }

        await customer.destroy();
        return
    } catch (err) {
        throw err
    }
}

module.exports = CustomerService;
