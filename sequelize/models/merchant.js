'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merchant.hasMany(models.Product, { as: 'products' })
    }
  }
  Merchant.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    shopName: DataTypes.STRING,
    shopMobile: DataTypes.STRING,
    shopAddress: DataTypes.STRING,
    shopImage: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};