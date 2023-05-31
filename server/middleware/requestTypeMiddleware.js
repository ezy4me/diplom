const ApiError = require("../error/ApiError");
const { RequestType } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан тип заявки!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан тип заявки!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название типа заявки!"))
    }

    const requestType = await RequestType.findOne({ where: { name } })

    if (requestType) {
        return next(ApiError.NotFound("Данный тип уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан тип заявки!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название типа заявки!"))
    }

    const requestType = await RequestType.findOne({ where: { id } })

    if (name != requestType.name && await RequestType.findOne({ where: { name } })) {
        return next(ApiError.NotFound("Данный тип уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}