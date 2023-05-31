const { RequestStatus } = require("../models/models");
const ApiError = require("../error/ApiError");

class RequestStatusController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const requestStatus = await RequestStatus.create({ name });
      return res.json(requestStatus);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const requestStatuss = await RequestStatus.findAndCountAll();
      return res.json(requestStatuss);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const requestStatus = await RequestStatus.findOne({ where: { id } });

      return res.json(requestStatus);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const requestStatus = await RequestStatus.findOne({ where: { id } });

      if (requestStatus) {
        await RequestStatus.destroy({ where: { id } });
        return res.json(requestStatus);
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

      const requestStatus = await RequestStatus.update(values, condition, options);

      return res.json(requestStatus);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new RequestStatusController();
