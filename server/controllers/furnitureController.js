const { Furniture, Color } = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");
const uuid = require("uuid");

class FurnitureController {
  async create(req, res, next) {
    try {
      const { name, price, count, colorId } = req.body;
      const image = req.files.image;
      let fileName = uuid.v4() + ".jpg";

      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const furniture = await Furniture.create({
        name,
        price,
        count,
        colorId,
        image: fileName,
      });

      return res.json(furniture);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const furnitures = await Furniture.findAndCountAll({
        include: [{ model: Color, as: "color" }],
      });
      return res.json(furnitures);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const furniture = await Furniture.findOne({ where: { id } });

      return res.json(furniture);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const furniture = await Furniture.findOne({ where: { id } });

      if (furniture) {
        await Furniture.destroy({ where: { id } });
        return res.json(furniture);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, price, count, colorId } = req.body;

      const condition = { where: { id } };
      const options = { multi: true };

      if (!req.files || Object.keys(req.files).length === 0) {
        const values = { name, price, count, colorId };
        const furniture = await Furniture.update(values, condition, options);
        return res.json(furniture);
      }
      else {
        const image = req.files.image;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName));

        const values = { name, price, count, colorId, image: fileName };

        const furniture = await Furniture.update(values, condition, options);
        return res.json(furniture);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new FurnitureController();
