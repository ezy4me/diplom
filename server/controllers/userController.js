const {
  User,
  Order,
  OrderProduct,
  Product,
  Material,
  Color,
  Furniture,
  Size,
  Category,
  Cut,
  OrderStatus,
  Payment,
  ProductMaterial,
  ProductFurniture,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (Id, Email, Role) => {
  return jwt.sign({ Id, Email, Role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

const generatePassword = () => {
  const length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let res = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    res += charset.charAt(Math.floor(Math.random() * n));
  }
  return res;
};

class UserController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.InternetServerError("Пользователь не существует"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.InternetServerError("Указан неверный пароль"));
      }
      const token = generateJwt(user.id, user.email, user.role);

      return res.json({ token, user });
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const { email, password, fio, phone } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некорректный email или password"));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 2);
      const user = await User.create({
        email,
        password: hashPassword,
        fio,
        phone,
      });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAndCountAll();
      return res.json(users);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const userOrders = await Order.findAll({
        where: { userId: id },
      });

      const result = [];
      for (var i = 0; i < userOrders.length; i++) {
        var orderProducts = await OrderProduct.findAll({
          where: { orderId: userOrders[i].id },
          include: [{ model: Product, as: "product" }],
        });
        let userOrdersProducts = [];

        for (var j = 0; j < orderProducts.length; j++) {
          let productMaterial = await ProductMaterial.findAll({
            where: { productId: orderProducts[j].productId },
            include: [
              {
                model: Material,
                include: [
                  {
                    model: Color, as: 'color'
                  },
                ],
              },
            ],
          });

          let productFurniture = await ProductFurniture.findAll({
            where: { productId: orderProducts[j].productId },
            include: [{ model: Furniture }],
          });

          // let productMaterialColor = await Color.findOne({
          //   where: { id: productMaterial.colorId },
          // });
          let productSize = await Size.findOne({
            where: { id: orderProducts[j].product.sizeId },
          });
          let productCategory = await Category.findOne({
            where: { id: orderProducts[j].product.categoryId },
          });
          let productCut = await Cut.findOne({
            where: { id: orderProducts[j].product.cutId },
          });
          let orderStatus = await OrderStatus.findOne({
            where: { id: userOrders[i].orderStatusId },
          });
          let orderPayment = await Payment.findOne({
            where: { id: userOrders[i].paymentId },
          });

          let order = {
            orderId: orderProducts[j].orderId,
            date: userOrders[i].date,
            status: orderStatus.name,
            payment: orderPayment.type,
            product: {
              image: orderProducts[j].product.image,
              name: orderProducts[j].product.name,
              price: orderProducts[j].product.price,
              description: orderProducts[j].product.description,
              material: productMaterial.map((m) => m.material),
              // materialColor: productMaterialColor.hex,
              furniture: productFurniture.map((f) => f.furniture),
              size: productSize.name,
              category: productCategory.name,
              cut: productCut.name,
            },
          };
          userOrdersProducts.push(order);
        }
        result.push(userOrdersProducts);
      }
      return res.json(result);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findOne({ where: { id } });

      if (user) {
        const order = await Order.findAll({ where: { userId: id } });
        for (let i = 0; i < order.length; i++) {
          await OrderProduct.destroy({ where: { orderId: order[i].id } });
        }
        await Order.destroy({ where: { userId: id } });
        await User.destroy({ where: { id } });
        return res.json(user);
      }
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id, email, fio, phone } = req.body;

      const values = { email, fio, phone };
      const condition = { where: { id } };
      const options = { multi: true };

      const user = await User.update(values, condition, options);

      return res.json(user);
    } catch (e) {
      return next(ApiError.InternetServerError(e.message));
    }
  }
}

module.exports = new UserController();
