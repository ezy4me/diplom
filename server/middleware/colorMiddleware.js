const ApiError = require("../error/ApiError");
const { Color } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан цвет!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан цвет!"))
    }
    next()
}

async function create(req, res, next) {
    const { name, hex } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название цвета!"))
    }
    if (!hex) {
        return next(ApiError.NotFound("Некорректно указано значение цвета!"))
    }

    const color = await Color.findOne({ where: { name } })

    if (color) {
        return next(ApiError.NotFound("Данный цвет уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name, hex } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан цвет!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название цвета!"))
    }
    if (!hex) {
        return next(ApiError.NotFound("Некорректно указано значение цвета!"))
    }

    const color = await Color.findOne({ where: { name } })

    if (color) {
        return next(ApiError.NotFound("Данный цвет уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}