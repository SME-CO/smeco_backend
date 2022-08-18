const { sequelize, CustomerUser } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const CustomerUserService = function () { };


CustomerUserService.create = async (validatedRequest) => {
    try {

        const customerExists = await CustomerUser.findOne(
            { where: { email: validatedRequest.email } }
        );

        if (customerExists) {
            throw new ServiceLayerError("This customer already exists");
        }

        // const existingNumber = await VerifiedCustomerNumbers.findOne(
        //     { where: { mobile: validatedRequest.mobile } }
        // );

        // if (!existingNumber) {
        //     throw new ServiceLayerError("OTP not verified");
        // }

        // if (validatedRequest.otp === existingNumber.otp) {

        //     existingNumber.set({
        //         isVerified: true,
        //     });

        //     await existingNumber.save();
        // } else {
        //     throw new ServiceLayerError("OTP Is Incorrect");
        // }

        const salt = await bcrypt.genSalt(10);

        const customer = await CustomerUser.create({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName,
            mobile: validatedRequest.mobile,
            email: validatedRequest.email,
            password: await bcrypt.hash(validatedRequest.password, salt)
        });

        await customer.save();
        return customer
    } catch (err) {
        throw err
    }
}

CustomerUserService.login = async (validatedRequest) => {
    try {

        const customer = await CustomerUser.findOne(
            { where: { email: validatedRequest.email } }
        );

        if (!customer) {
            throw new ServiceLayerError("This email does not exists");
        }

        const password_valid = await bcrypt.compare(validatedRequest.password, customer.password);

        if (password_valid) {
            plan_customer_object = {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                mobile: customer.mobile,
                email: customer.email
            }

            token = jwt.sign(plan_customer_object, process.env.SECRET);
            return token;
        } else {
            throw new ServiceLayerError("Password Mismatch");
        }

    } catch (error) {
        throw error;
    }
}

CustomerUserService.findById = async (id) => {
    try {

        const customer = await CustomerUser.findByPk(id);

        if (!customer) {
            throw new ServiceLayerError("Object Not Found");
        }

        return customer;
    } catch (error) {
        throw error;
    }
}

module.exports = CustomerUserService;
