const { Size } = require("../models/models");
const ApiError = require("../error/ApiError");

class SizeController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const size = await Size.create({ name });
      return res.json(size);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res) {
    try {
      const sizes = await Size.findAndCountAll();
      return res.json(sizes);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;

      const size = await Size.findOne({ where: { id } });

      return res.json(size);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res) {
    try {
      const { id } = req.params;

      const size = await Size.findOne({ where: { id } });

      if (size) {
        await Size.destroy({ where: { id } });
        return res.json(size);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res) {
    try {
      const { id, name } = req.body;

      const values = { name };
      const condition = { where: { id } };
      const options = { multi: true };

      const size = await Size.update(values, condition, options);

      return res.json(size);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new SizeController();
