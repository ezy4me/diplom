const { Request, RequestType, RequestStatus } = require("../models/models");
const ApiError = require("../error/ApiError");

class RequestController {
  async create(req, res, next) {
    try {
      const { name, email, phone, description, requestType } = req.body;
      const userRequest = await Request.create({
        name,
        email,
        phone,
        description,
        requestTypeId: requestType,
        requestStatusId: 1
      });
      return res.json(userRequest);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const userRequests = await Request.findAndCountAll({
        include: [
          {
            model: RequestType, as: 'requestType'
          },
          {
            model: RequestStatus, as: 'requestStatus'
          }

        ]
      });
      return res.json(userRequests);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const userRequest = await Request.findOne({ where: { id } });

      return res.json(userRequest);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const userRequest = await Request.findOne({ where: { id } });

      if (userRequest) {
        await Request.destroy({ where: { id } });
        return res.json(userRequest);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, email, phone, description, requestStatus } = req.body;

      const values = { name, email, phone, description, requestStatusId: requestStatus };
      const condition = { where: { id } };
      const options = { multi: true };

      const userRequest = await Request.update(values, condition, options);

      return res.json(userRequest);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new RequestController();
