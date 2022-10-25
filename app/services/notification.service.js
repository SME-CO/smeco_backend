const { sequelize, Notification } = require('../../sequelize/models');
const ServiceLayerError = require('../services/Exceptions/service.exceptions.js')

const NotificationService = function () { };

NotificationService.findAll = async () => {
    try {

        const notifications = await Notification.findAll();
        return notifications;
    } catch (err) {
        throw err
    }
}

NotificationService.findById = async (id) => {
    try {

        const notification = await Notification.findByPk(id);

        if (!notification) {
            throw new ServiceLayerError("Object Not Found");
        }

        return notification;
    } catch (error) {
        throw error;
    }
}

module.exports = NotificationService;