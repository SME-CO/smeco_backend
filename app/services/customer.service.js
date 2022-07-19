const { sequelize, Customer } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')

const CustomerService = function () { };

CustomerService.create = async (validatedRequest) => {
    try {

        const customerExists = await Customer.findOne(
            { where: { email: validatedRequest.email } }
        );

        if (customerExists) {
            throw new ServiceLayerError("This email already exists")
        }

        const customer = await Customer.create({
            firstName: validatedRequest.firstName,
            lastName: validatedRequest.lastName,
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
