const FaqService = require("../services/faq.service");
const { body } = require("express-validator");
const { validationResult } = require("express-validator/check");
const ServiceLayerError = require("../services/Exceptions/service.exceptions");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [body("message")];
    }

    case "view": {
      return [body("message")];
    }

    case "update": {
      return [body("message")];
    }
  }
};

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const validatedRequest = req.body;

    const faqResponse = await FaqService.create(validatedRequest);

    res.send(faqResponse);
  } catch (error) {
    if (error instanceof ServiceLayerError)
      res.status(400).json({ error: error, message: error.message, code: 400 });
    res.status(500).json({ error: error, message: error.message, code: 500 });
  }
};

exports.getAll = async (req, res) => {
  try {
    const faq = await FaqService.findAll();

    res.send(faq);
  } catch (error) {
    if (error instanceof ServiceLayerError)
      res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const faq = await FaqService.findById(req.params.id);
    res.send(faq);
  } catch (error) {
    if (error instanceof ServiceLayerError)
      res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const validatedRequest = req.body;

    const faq = await FaqService.update(req.params.id, validatedRequest);

    res.send(faq);
  } catch (error) {
    if (error instanceof ServiceLayerError)
      res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};
