const ApiError = require("../error/ApiError");
const { Product } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указано изделие!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указано изделие!"))
    }
    next()
}

async function create(req, res, next) {
    const { name, price, count, categoryId,
        cutId, sizeId, furnitures, materials } = req.body
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название изделия!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость изделия!"))
    }
    if (!count) {
        return next(ApiError.NotFound("Некорректно указано количество изделия!"))
    }
    if (!categoryId) {
        return next(ApiError.NotFound("Некорректно указана категория изделия!"))
    }
    if (!cutId) {
        return next(ApiError.NotFound("Некорректно указан крой изделия!"))
    }
    if (!sizeId) {
        return next(ApiError.NotFound("Некорректно указан размер изделия!"))
    }
    if (!furnitures) {
        return next(ApiError.NotFound("Некорректно указана фурнитура изделия!"))
    }
    if (!materials) {
        return next(ApiError.NotFound("Некорректно указан материал изделия!"))
    }

    const product = await Product.findOne({ where: { name } })

    if (product) {
        return next(ApiError.NotFound("Данное изделие уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, name, price, count, categoryId,
        cutId, sizeId, furnitures, materials } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер изделия!"))
    }
    if (!name) {
        return next(ApiError.NotFound("Некорректно указано название изделия!"))
    }
    if (!price) {
        return next(ApiError.NotFound("Некорректно указана стоимость изделия!"))
    }
    if (!count) {
        return next(ApiError.NotFound("Некорректно указано количество изделия!"))
    }
    if (!categoryId) {
        return next(ApiError.NotFound("Некорректно указана категория изделия!"))
    }
    if (!cutId) {
        return next(ApiError.NotFound("Некорректно указан крой изделия!"))
    }
    if (!sizeId) {
        return next(ApiError.NotFound("Некорректно указан размер изделия!"))
    }
    if (!furnitures) {
        return next(ApiError.NotFound("Некорректно указана фурнитура изделия!"))
    }
    if (!materials) {
        return next(ApiError.NotFound("Некорректно указан материал изделия!"))
    }

    const product = await Product.findOne({ where: { type } })

    if (product) {
        return next(ApiError.NotFound("Данное изделие уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}