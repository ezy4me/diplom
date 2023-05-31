const { RequestType } = require("../models/models");
const ApiError = require("../error/ApiError");

class RequestTypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const requestType = await RequestType.create({ name });
      return res.json(requestType);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const requestTypes = await RequestType.findAndCountAll();
      return res.json(requestTypes);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const requestType = await RequestType.findOne({ where: { id } });

      return res.json(requestType);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const requestType = await RequestType.findOne({ where: { id } });

      if (requestType) {
        await RequestType.destroy({ where: { id } });
        return res.json(requestType);
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

      const requestType = await RequestType.update(values, condition, options);

      return res.json(requestType);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new RequestTypeController();
