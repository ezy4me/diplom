const ApiError = require("../error/ApiError");
const { Sale } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана скидка!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана скидка!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название категории!"))
    }

    const sale = await Sale.findOne({ where: { name } })

    if (sale) {
        return next(ApiError.NotFound("Данная скидка уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана скидка!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название категории!"))
    }

    const sale = await Sale.findOne({ where: { id } })

    if (name != sale.name && await Sale.findOne({ where: { name } })) {
        return next(ApiError.NotFound("Данная скидка уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}