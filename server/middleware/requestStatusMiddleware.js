const ApiError = require("../error/ApiError");
const { RequestStatus } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус заявки!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус заявки!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название статуса заявки!"))
    }

    const requestStatus = await RequestStatus.findOne({ where: { name } })

    if (requestStatus) {
        return next(ApiError.NotFound("Данный статус уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан статус заявки!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название статуса заявки!"))
    }

    const requestStatus = await RequestStatus.findOne({ where: { name } })

    if (requestStatus) {
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