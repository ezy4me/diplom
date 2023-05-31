const { Service } = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");
const uuid = require("uuid");

class ServiceController {
  async create(req, res, next) {
    try {
      const { name, description, price } = req.body;
      const image = req.files.image;
      let fileName = uuid.v4() + ".jpg";

      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const service = await Service.create({
        name,
        description,
        price,
        image: fileName,
      });

      return res.json(service);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const services = await Service.findAndCountAll();
      return res.json(services);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findOne({ where: { id } });

      return res.json(service);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findOne({ where: { id } });

      if (service) {
        await Service.destroy({ where: { id } });
        return res.json(service);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, description, price } = req.body;

      const condition = { where: { id } };
      const options = { multi: true };

      if (!req.files || Object.keys(req.files).length === 0) {
        const values = { name, description, price };
        const service = await Service.update(values, condition, options);
        return res.json(service);
      }
      else {
        const image = req.files.image;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName));

        const values = { name, description, price, image: fileName };

        const service = await Service.update(values, condition, options);
        return res.json(service);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new ServiceController();
