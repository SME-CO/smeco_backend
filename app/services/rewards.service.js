const { sequelize, Rewards } = require("../../sequelize/models");
const ServiceLayerError = require("../services/Exceptions/service.exceptions.js");

const RewardsService = function () {};

RewardsService.create = async (validatedRequest) => {
  try {
    const rewards = await Rewards.create({
      name: validatedRequest.name,
      merchantId: 1,
      startDate: validatedRequest.startDate,
      endDate: validatedRequest.endDate,
      rewardLimit: validatedRequest.rewardLimit,
      rewardAmount: validatedRequest.rewardAmount,
    });

    await rewards.save();
    return rewards;
  } catch (err) {
    throw err;
  }
};

module.exports = RewardsService;
