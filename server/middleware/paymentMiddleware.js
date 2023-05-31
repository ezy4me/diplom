const ApiError = require("../error/ApiError");
const { Payment } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус оплаты!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус оплаты!"))
    }
    next()
}

async function create(req, res, next) {
    const { type } = req.body
    if (!type) {
        return next(ApiError.NotFound("Некорректно указано название статуса оплаты!"))
    }

    const payment = await Payment.findOne({ where: { type } })

    if (payment) {
        return next(ApiError.NotFound("Данный статус уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, type } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус оплаты!"))
    }
    if (!type) {
        return next(ApiError.NotFound("Некорректно указано название статуса оплаты!"))
    }

    const payment = await Payment.findOne({ where: { type } })

    if (payment) {
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