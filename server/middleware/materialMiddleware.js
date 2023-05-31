const ApiError = require("../error/ApiError");
const { Material } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан материал!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан материал!"))
    }
    next()
}

async function create(req, res, next) {
    const { name, price, count, colorId } = req.body
    
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название материала!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость материала!"))
    }
    if (!count) {
        return next(ApiError.NotFound("Некорректно указано количество материала!"))
    }
    if (!colorId) {
        return next(ApiError.NotFound("Некорректно указан цвет материала!"))
    }

    const material = await Material.findOne({ where: { name } })

    if (material) {
        return next(ApiError.NotFound("Данный материал уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name, price, count, colorId } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан материал!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название материала!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость материала!"))
    }
    if (!count) {
        return next(ApiError.NotFound("Некорректно указано количество материала!"))
    }
    if (!colorId) {
        return next(ApiError.NotFound("Некорректно указан цвет материала!"))
    }

    const material = await Material.findOne({ where: { id } })

    if (name != material.name && await Material.findOne({ where: { name } })) {
        return next(ApiError.NotFound("Данный материал уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}