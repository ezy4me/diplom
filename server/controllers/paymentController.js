const { Payment } = require("../models/models");
const ApiError = require("../error/ApiError");

class PaymentController {
  async create(req, res, next) {
    try {
      const { type } = req.body;
      const payment = await Payment.create({ type });
      return res.json(payment);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const payments = await Payment.findAndCountAll();
      return res.json(payments);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
    const { id } = req.params;

    const payment = await Payment.findOne({ where: { id } });

    return res.json(payment);
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ where: { id } });

      if (payment) {
        await Payment.destroy({ where: { id } });
        return res.json(payment);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, type } = req.body;

      const values = { type };
      const condition = { where: { id } };
      const options = { multi: true };

      const payment = await Payment.update(values, condition, options);

      return res.json(payment);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new PaymentController();
