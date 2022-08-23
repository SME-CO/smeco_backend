const { sequelize, Product } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')
//const smsAPI = require('../external_services/smsAPI');

const ProductService = function () { };



ProductService.create = async (validatedRequest) => {
    try {

        

        const [product] = await Product.create({
            productName: validatedRequest.productName,
            merchantId: 1,
            image: validatedRequest.image,
            price: validatedRequest.price,
            catagory: validatedRequest.catagory,
            offers: validatedRequest.offers
        });


        await product.save();
        return product
    } catch (err) {
        throw err
    }
}

ProductService.findAll = async () => {
    try {

        const products = await Product.findAll();
        return products;
    } catch (err) {
        throw err
    }
}

ProductService.findById = async (id) => {
    try {

        const product = await Product.findByPk(id);

        if (!product) {
            throw new ServiceLayerError("Object Not Found");
        }

        return product;
    } catch (error) {
        throw error;
    }
}

ProductService.update = async (id, validatedRequest) => {
    try {

        const product = await ProductService.findById(id);

        if (!product) {
            throw new ServiceLayerError("Object Not Found");
        }

        product.set({
            productName: validatedRequest.productName
        })

        await product.save();
        return product
    } catch (err) {
        throw err
    }
}

ProductService.delete = async (id) => {
    try {

        const product = await ProductService.findById(id);

        if (!product) {
            throw new ServiceLayerError("Object Not Found");
        }

        await product.destroy();
        return
    } catch (err) {
        throw err
    }
}

module.exports = ProductService;
