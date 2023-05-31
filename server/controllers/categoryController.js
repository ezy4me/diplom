const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });

      return res.json(category);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await Category.findAndCountAll();

      return res.json(categories);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ where: { id } });

      return res.json(category);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ where: { id } });

      if (category) {
        await Category.destroy({ where: { id } });
        return res.json(category);
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

      const category = await Category.update(values, condition, options);

      return res.json(category);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new CategoryController();
