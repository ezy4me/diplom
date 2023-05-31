const ApiError = require("../error/ApiError");
const { Request } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер заявки!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер заявки!"))
    }
    next()
}

async function create(req, res, next) {
    const { name, email, phone, requestType } = req.body
    
    if (!name || name.split(' ').length < 2) {
        return next(ApiError.NotFound("Некорректно указано имя пользователя!"))
    }
    if (!email) {
        return next(ApiError.NotFound("Некорректно указана почта пользователя!"))
    }
    if (!phone) {
        return next(ApiError.NotFound("Некорректно указан номер телефона!"))
    }
    if (!requestType) {
        return next(ApiError.NotFound("Некорректно указан статус заявки!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name, email, phone, requestType } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер заявки!"))
    }
    if (!name || name.split(' ').length < 2) {
        return next(ApiError.NotFound("Некорректно указано имя пользователя!"))
    }
    if (!email) {
        return next(ApiError.NotFound("Некорректно указана почта пользователя!"))
    }
    if (!phone) {
        return next(ApiError.NotFound("Некорректно указан номер телефона!"))
    }
    if (!requestType) {
        return next(ApiError.NotFound("Некорректно указан статус заявки!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}