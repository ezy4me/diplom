const ApiError = require("../error/ApiError");
const { Category } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана категория!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана категория!"))
    }
    next()
}

async function create(req, res, next) {
    const { name } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название категории!"))
    }

    const category = await Category.findOne({ where: { name } })

    if (category) {
        return next(ApiError.NotFound("Данная категория уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указана категория!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название категории!"))
    }

    const category = await Category.findOne({ where: { id } })

    if (name != category.name && await Category.findOne({ where: { name } })) {
        return next(ApiError.NotFound("Данная категория уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}