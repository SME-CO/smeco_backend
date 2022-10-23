const { sequelize, Product, Purchase, Merchant, PurchaseProduct } = require('../../sequelize/models');
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

ProductService.createPurchase = async (validatedRequest) => {
    try {
        const merchant = await Merchant.findByPk(validatedRequest.merchantId);

        const purchase = await Purchase.create({
            customerId: validatedRequest.customerId,
            merchantId: validatedRequest.merchantId,
            customerName: validatedRequest.customerName,
            merchantName: merchant.shopName,
            purchaseDate: new Date().toISOString().slice(0, 10),
            totalAmount: validatedRequest.totalAmount
        })

        await purchase.save();

        for (let i = 0; i < validatedRequest.cart.length; i++) {

            const productSet = await PurchaseProduct.create({
                purchaseId: purchase.id,
                productId: validatedRequest.cart[i].product.id,
                customerId: validatedRequest.customerId,
                quantity: validatedRequest.cart[i].quantity,
                productName: validatedRequest.cart[i].product.productName,
                amount: validatedRequest.cart[i].total,
                unitPrice: validatedRequest.cart[i].unitPrice
            });

            await productSet.save()
        }

        return purchase;

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


ProductService.findByMerchant = async (id) => {
    try {

        const products = await Product.findAll(
            { where: { merchantId: id } }
        );

        return products;
    } catch (error) {
        throw error;
    }
}

ProductService.findByCategory = async (category) => {
    try {

        const products = await Product.findAll(
            { where: { category: category } }
        );

        return products;
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
