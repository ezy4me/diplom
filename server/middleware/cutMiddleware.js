const ApiError = require("../error/ApiError");
const { Cut } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан крой изделия!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан крой изделия!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название кроя!"))
    }

    const cut = await Cut.findOne({ where: { name } })

    if (cut) {
        return next(ApiError.NotFound("Данный вид кроя уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан крой изделия!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название кроя!"))
    }

    const cut = await Cut.findOne({ where: { name } })

    if (cut) {
        return next(ApiError.NotFound("Данный вид кроя уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}