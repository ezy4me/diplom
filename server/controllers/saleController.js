const { Sale } = require("../models/models");
const ApiError = require("../error/ApiError");

class SaleController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const sale = await Sale.create({ name });
      return res.json(sale);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const sales = await Sale.findAndCountAll();
      return res.json(sales);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message)); 
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const sale = await Sale.findOne({ where: { id } });

      return res.json(sale);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const sale = await Sale.findOne({ where: { id } });

      if (sale) {
        await Sale.destroy({ where: { id } });
        return res.json(sale);
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

      const sale = await Sale.update(values, condition, options);

      return res.json(sale);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new SaleController();
