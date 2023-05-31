const { Color } = require("../models/models");
const ApiError = require("../error/ApiError");

class ColorController {
  async create(req, res, next) {
    try {
      const { name, hex } = req.body;
      const color = await Color.create({ name, hex });
      return res.json(color);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const colors = await Color.findAndCountAll();
      return res.json(colors);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const color = await Color.findOne({ where: { id } });

      return res.json(color);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const color = await Color.findOne({ where: { id } });

      if (color) {
        await Color.destroy({ where: { id } });
        return res.json(color);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, hex } = req.body;

      const values = { name, hex };
      const condition = { where: { id } };
      const options = { multi: true };

      const color = await Color.update(values, condition, options);

      return res.json(req.body);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new ColorController();
