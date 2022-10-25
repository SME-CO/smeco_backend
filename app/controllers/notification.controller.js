const NotificationService = require("../services/notification.service")
const ServiceLayerError = require("../services/Exceptions/service.exceptions");

exports.getAll = async (req, res) => {
    try {

        const notifications = await NotificationService.findAll();

        res.send(notifications);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};

exports.getById = async (req, res) => {
    try {
        const notification = await NotificationService.findById(req.params.id)
        res.send(notification);
    } catch (error) {
        if (error instanceof ServiceLayerError) res.status(400).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
};