const {
  Order,
  OrderStatus,
  Sale,
  Payment,
  User,
  OrderProduct,
  Product,
} = require("../models/models");
const ApiError = require("../error/ApiError");

class OrderController {
  async create(req, res, next) {
    try {
      const { userId, paymentId, saleId, orderStatusId, products } = req.body;

      if (products.length) {
        const order = await Order.create({
          userId,
          paymentId,
          saleId,
          orderStatusId,
        });

        for (let i = 0; i < products.length; i++) {
          await OrderProduct.create({
            orderId: order.id,
            productId: products[i],
          });
        }
        return res.json(order);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await Order.findAndCountAll({
        include: [
          { model: User, as: "user" },
          { model: OrderStatus, as: "order_status" },
          { model: Sale, as: "sale" },
          { model: Payment, as: "payment" },
        ],
      });

      return res.json(orders);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }

  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const order = await OrderProduct.findAll({
        where: { orderId: id },
        include: [{ model: Product, as: "product" }],
      });

      return res.json(order);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({ where: { id } });

      if (order) {
        await OrderProduct.destroy({ where: { orderId: id } });
        await Order.destroy({ where: { id } });
        return res.json(order);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, userId, paymentId, saleId, orderStatusId, products } =
        req.body;

      const values = { userId, paymentId, saleId, orderStatusId };
      const condition = { where: { id } };
      const options = { multi: true };

      const order = await Order.update(values, condition, options);

      await OrderProduct.destroy({ where: { orderId: id } });

      for (let i = 0; i < products.length; i++) {
        await OrderProduct.create({ orderId: id, productId: products[i] });
      }

      return res.json(order);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new OrderController();
