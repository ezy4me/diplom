const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    fio: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
})

const Request = sequelize.define('request',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true }
    })

const RequestStatus = sequelize.define('request_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const RequestType = sequelize.define('request_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Product = sequelize.define('product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true },
        price: { type: DataTypes.DECIMAL, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        count: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true }
    })

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Cut = sequelize.define('cut', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Size = sequelize.define('size', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Furniture = sequelize.define('furniture', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    count: { type: DataTypes.INTEGER, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
})

const Material = sequelize.define('material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    count: { type: DataTypes.INTEGER, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
})

const Color = sequelize.define('color', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    hex: { type: DataTypes.STRING, allowNull: true },
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE, defaultValue: Date.now() },
})

const OrderStatus = sequelize.define('order_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Payment = sequelize.define('payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Sale = sequelize.define('sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Service = sequelize.define('service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
})

const OrderProduct = sequelize.define('order_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// const OrderService = sequelize.define('order_service', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

const ProductFurniture = sequelize.define('product_furniture', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const ProductMaterial = sequelize.define('product_material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

/// Product relations ///

Category.hasMany(Product, {onDelete: 'CASCADE'})
Product.belongsTo(Category, { as: 'category' })

Cut.hasMany(Product, {onDelete: 'CASCADE'})
Product.belongsTo(Cut, { as: 'cut' })

Size.hasMany(Product, {onDelete: 'CASCADE'})
Product.belongsTo(Size, { as: 'size' })

Product.hasMany(ProductFurniture, { as: 'furnitures' }, {onDelete: 'CASCADE'})
ProductFurniture.belongsTo(Product)

Product.hasMany(ProductMaterial, { as: 'materials' }, {onDelete: 'CASCADE'})
ProductMaterial.belongsTo(Product)

/// Furniture and Material relations ///

Color.hasMany(Furniture, { onDelete: 'CASCADE' })
Furniture.belongsTo(Color, { as: 'color' })

Color.hasMany(Material, { onDelete: 'CASCADE' })
Material.belongsTo(Color, { as: 'color' })

Furniture.hasMany(ProductFurniture, {onDelete: 'CASCADE'})
ProductFurniture.belongsTo(Furniture)

Material.hasMany(ProductMaterial, {onDelete: 'CASCADE'})
ProductMaterial.belongsTo(Material)

/// OrderProduct relations

Order.hasMany(OrderProduct, {onDelete: 'CASCADE'})
OrderProduct.belongsTo(Order, { as: 'order' })

Product.hasMany(OrderProduct, {onDelete: 'CASCADE'})
OrderProduct.belongsTo(Product, { as: 'product' })

/// Order relattions ///

User.hasMany(Order, {onDelete: 'CASCADE'})
Order.belongsTo(User)

OrderStatus.hasMany(Order, {onDelete: 'CASCADE'})
Order.belongsTo(OrderStatus)

Payment.hasMany(Order, {onDelete: 'CASCADE'})
Order.belongsTo(Payment)

Sale.hasMany(Order, {onDelete: 'CASCADE'})
Order.belongsTo(Sale)

/// Request relattions ///

RequestStatus.hasMany(Request, {onDelete: 'CASCADE'})
Request.belongsTo(RequestStatus, { as: 'requestStatus' })

RequestType.hasMany(Request, {onDelete: 'CASCADE'})
Request.belongsTo(RequestType, { as: 'requestType' })

/// OrderService relations ///

// Order.hasMany(OrderService)
// OrderService.belongsTo(Order)

// Service.hasMany(OrderService)
// OrderService.belongsTo(Service)

module.exports = {
    User,
    Request,
    RequestStatus,
    RequestType,
    Product,
    ProductMaterial,
    ProductFurniture,
    Category,
    Cut,
    Size,
    Furniture,
    Material,
    Color,
    Order,
    OrderStatus,
    Payment,
    Sale,
    Service,
    OrderProduct,
    // OrderService
}