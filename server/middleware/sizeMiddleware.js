const ApiError = require("../error/ApiError");
const { Size } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан размер изделия!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан размер изделия!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название размера!"))
    }

    const size = await Size.findOne({ where: { name } })

    if (size) {
        return next(ApiError.NotFound("Данный размер уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан размер изделия!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название размера!"))
    }

    const size = await Size.findOne({ where: { name } })

    if (size) {
        return next(ApiError.NotFound("Данный размер уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}