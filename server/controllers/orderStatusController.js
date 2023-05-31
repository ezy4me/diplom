const { OrderStatus } = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderStatusController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const orderStatus = await OrderStatus.create({ name });
      return res.json(orderStatus);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const orderStatuses = await OrderStatus.findAndCountAll();
      return res.json(orderStatuses);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const orderStatus = await OrderStatus.findOne({ where: { id } });

      return res.json(orderStatus);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const orderStatus = await OrderStatus.findOne({ where: { id } });

      if (orderStatus) {
        await OrderStatus.destroy({ where: { id } });
        return res.json(orderStatus);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, name } = req.body;

      const values = { name };
      const condition = { where: { id } };
      const options = { multi: true };

      const orderStatus = await OrderStatus.update(values, condition, options);

      return res.json(orderStatus);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new OrderStatusController();
