const { sequelize, Offer, BuyGetOffer, Product, BundleOffer, BundleOfferProductSet } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')

const OfferService = function () { };

OfferService.createBuyGet = async (validatedRequest) => {
    try {
        console.log(validatedRequest);
        const offerExists = await BuyGetOffer.findOne(
            { where: { productId: validatedRequest.productId } }
        );

        console.log(offerExists);

        if (offerExists) {
            throw new ServiceLayerError("A Buy-Get offer already exists for this product");
        }

        const offer = await Offer.create({
            name: `Buy ${validatedRequest.buyQuantity} and Get ${validatedRequest.getQuantity}`,
            type: 'buyGet',
            merchantID: validatedRequest.merchantId
        })

        await offer.save();

        const product = await Product.findByPk(validatedRequest.productId);

        if (product) {
            const buyGetOffer = await BuyGetOffer.create({
                name: offer.name,
                buyQuantity: validatedRequest.buyQuantity,
                getQuantity: validatedRequest.getQuantity,
                merchantID: validatedRequest.merchantId,
                offerId: offer.id,
                productId: validatedRequest.productId
            })

            await buyGetOffer.save();
        }

        return offer;
    } catch (err) {
        throw err
    }
}

OfferService.createBundle = async (validatedRequest) => {
    try {
        const offer = await Offer.create({
            name: validatedRequest.name,
            type: 'bundle',
            merchantID: validatedRequest.merchantId
        });

        await offer.save();

        const bundleOffer = await BundleOffer.create({
            name: validatedRequest.name,
            price: validatedRequest.price,
            merchantId: validatedRequest.merchantId,
            offerId: offer.id
        });

        await bundleOffer.save(); 

        for (let i = 0; i < validatedRequest.productIds.length; i++) {

            const productSet = await BundleOfferProductSet.create({
                productId: validatedRequest.productIds[i],
                bundleOfferId: bundleOffer.id,
                merchantId: validatedRequest.merchantId,
            });

            await productSet.save()
        }

        return bundleOffer;
    } catch (err) {
        throw err
    }
}

OfferService.findAllBuyGet = async () => {
    try {
        const offers = await BuyGetOffer.findAll();
        return offers;
    } catch (err) {
        throw err
    }
}

OfferService.findById = async (id) => {
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

OfferService.update = async (id, validatedRequest) => {
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

OfferService.delete = async (id) => {
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

module.exports = OfferService;
