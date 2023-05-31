const { Cut } = require("../models/models");
const ApiError = require("../error/ApiError");

class CutController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const cut = await Cut.create({ name });
      return res.json(cut);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const cuts = await Cut.findAndCountAll();
      return res.json(cuts);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const cut = await Cut.findOne({ where: { id } });

      return res.json(cut);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const cut = await Cut.findOne({ where: { id } });

      if (cut) {
        await Cut.destroy({ where: { id } });
        return res.json(cut);
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

      const cut = await Cut.update(values, condition, options);

      return res.json(cut);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new CutController();
