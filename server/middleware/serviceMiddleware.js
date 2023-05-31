const ApiError = require("../error/ApiError");
const { Service } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер услуги!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер услуги!"))
    }
    next()
}

async function create(req, res, next) {
    const { name, description, price } = req.body

    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название услуги!"))
    }
    if (!description) {
        return next(ApiError.NotFound("Некорректно указано описание услуги!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость услуги!"))
    }


    const service = await Service.findOne({ where: { name } })

    if (service) {
        return next(ApiError.NotFound("Данная услуга уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name, description, price } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер услуги!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название услуги!"))
    }
    if (!description) {
        return next(ApiError.NotFound("Некорректно указано описание услуги!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость услуги!"))
    }

    const service = await Service.findOne({ where: { name } })

    if (service) {
        return next(ApiError.NotFound("Данная услуга уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}