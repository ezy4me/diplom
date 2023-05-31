const ApiError = require("../error/ApiError");
const { Furniture } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана фурнитура!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана фурнитура!"))
    }
    next()
}

async function create(req, res, next) {
    const { name, price, count, colorId } = req.body
    
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название фурнитуры!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость фурнитуры!"))
    }
    if (!count) {
        return next(ApiError.NotFound("Некорректно указано количество фурнитуры!"))
    }
    if (!colorId) {
        return next(ApiError.NotFound("Некорректно указан цвет фурнитуры!"))
    }

    const furniture = await Furniture.findOne({ where: { name } })

    if (furniture) {
        return next(ApiError.NotFound("Данная фурнитура уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name, price, count, colorId } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана фурнитура!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название фурнитуры!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость фурнитуры!"))
    }
    if (!count) {
        return next(ApiError.NotFound("Некорректно указано количество фурнитуры!"))
    }
    if (!colorId) {
        return next(ApiError.NotFound("Некорректно указан цвет фурнитуры!"))
    }

    const furniture = await Furniture.findOne({ where: { id } })

    if (name != furniture.name && await Furniture.findOne({ where: { name } })) {
        return next(ApiError.NotFound("Данная фурнитура уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}