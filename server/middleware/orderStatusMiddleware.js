const ApiError = require("../error/ApiError");
const { OrderStatus } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус заказа!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус заказа!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название статуса заказа!"))
    }

    const orderStatus = await OrderStatus.findOne({ where: { name } })

    if (orderStatus) {
        return next(ApiError.NotFound("Данный статус уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус заказа!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название статуса заказа!"))
    }

    const orderStatus = await OrderStatus.findOne({ where: { name } })

    if (orderStatus) {
        return next(ApiError.NotFound("Данный статус уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}