const ApiError = require("../error/ApiError");
const { Order } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер заказа!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер заказа!"))
    }
    next()
}

async function create(req, res, next) {
    const { userId, paymentId, saleId, orderStatusId, products } = req.body

    if (!userId) {
        return next(ApiError.NotFound("Некорректно указан пользователь!"))
    }
    if (!paymentId) {
        return next(ApiError.NotFound("Некорректно указан статус оплаты!"))
    }
    if (!saleId) {
        return next(ApiError.NotFound("Некорректно указана скидка!"))
    }
    if (!orderStatusId) {
        return next(ApiError.NotFound("Некорректно указан статус заказа!"))
    }
    if (!products) {
        return next(ApiError.NotFound("Некорректно указаны изделия заказа!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, userId, paymentId, saleId, orderStatusId, products } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер заказа!"))
    }
    if (!userId) {
        return next(ApiError.NotFound("Некорректно указан пользователь!"))
    }
    if (!paymentId) {
        return next(ApiError.NotFound("Некорректно указан статус оплаты!"))
    }
    if (!saleId) {
        return next(ApiError.NotFound("Некорректно указана скидка!"))
    }
    if (!orderStatusId) {
        return next(ApiError.NotFound("Некорректно указан статус заказа!"))
    }
    if (!products) {
        return next(ApiError.NotFound("Некорректно указаны изделия заказа!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}