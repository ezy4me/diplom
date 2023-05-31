const {
  Product,
  Material,
  Furniture,
  Size,
  Cut,
  Category,
  ProductMaterial,
  ProductFurniture,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");
const uuid = require("uuid");

class ProductController {
  async create(req, res, next) {
    try {
      const {
        name,
        price,
        count,
        description,
        categoryId,
        cutId,
        sizeId,
        furnitures,
        materials,
      } = req.body;

      const { image } = req.files;
      let fileName = uuid.v4() + ".jpg";

      image.mv(path.resolve(__dirname, "..", "static", fileName));

      if (materials.length && furnitures.length) {
        const product = await Product.create({
          name,
          price,
          image: fileName,
          count,
          description,
          categoryId,
          cutId,
          sizeId,
        });

        const materialsArr = materials.split(",");
        const furnituresArr = furnitures.split(",");

        for (let i = 0; i < materialsArr.length; i++) {
          await ProductMaterial.create({
            productId: product.id,
            materialId: materialsArr[i],
          });
        }

        for (let i = 0; i < furnituresArr.length; i++) {
          await ProductFurniture.create({
            productId: product.id,
            furnitureId: furnituresArr[i],
          });
        }

        return res.json(product);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await Product.findAndCountAll({
        include: [
          {
            model: ProductMaterial,
            include: [
              {
                model: Material,
              },
            ],
            as: "materials",
          },
          {
            model: ProductFurniture,
            include: [
              {
                model: Furniture,
              },
            ],
            as: "furnitures",
          },
          { model: Size, as: "size" },
          { model: Cut, as: "cut" },
          { model: Category, as: "category" },
        ],
      });

      return res.json(products);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findOne({ where: { id } });

      return res.json(product);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findOne({ where: { id } });

      if (product) {
        await Product.destroy({ where: { id } });
        return res.json(product);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const {
        id,
        name,
        price,
        count,
        description,
        categoryId,
        cutId,
        sizeId,
        furnitures,
        materials,
      } = req.body;
      const { image } = req.files;
      let fileName = uuid.v4() + ".jpg";

      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const values = {
        name,
        price,
        count,
        description,
        categoryId,
        cutId,
        sizeId,
        image: fileName,
      };
      const condition = { where: { id } };
      const options = { multi: true };
      const product = await Product.update(values, condition, options);

      if(materials.length && furnitures.length)
      {
        const materialsArr = materials.split(",");
        const furnituresArr = furnitures.split(",");

        await ProductMaterial.destroy({ where: { productId: id } });
        await ProductFurniture.destroy({ where: { productId: id } });

        for (let i = 0; i < materialsArr.length; i++) {
          await ProductMaterial.create({ productId: id, materialId: materialsArr[i] });
        }

        for (let i = 0; i < furnituresArr.length; i++) {
          await ProductFurniture.create({ productId: id, furnitureId: furnituresArr[i] });
      }
    }

      return res.json(product);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new ProductController();
