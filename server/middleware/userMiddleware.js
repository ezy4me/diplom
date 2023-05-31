const ApiError = require("../error/ApiError");
const { User } = require("../models/models");

function getOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан пользователь!"))
    }
    next()
}

function deleteOne(req, res, next) {
    const { id } = req.params
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер пользователя!"))
    }
    next()
}

async function create(req, res, next) {
    const { email, fio, phone } = req.body
    
    if (!email) {
        return next(ApiError.NotFound("Некорректно указана почта пользователя!"))
    }
    if (!fio || fio.split(' '.length < 2)) {
        return next(ApiError.NotFound("Некорректно указано Ф.И.О. пользователя!"))
    }
    if (!phone) {
        return next(ApiError.NotFound("Некорректно указан номер телефона пользователя!"))
    }

    const userEmail = await User.findOne({ where: { email } })
    const userFio = await User.findOne({ where: { fio } })
    const userPhone = await User.findOne({ where: { phone } })

    if (userEmail) {
        return next(ApiError.NotFound("Данная почта уже существует!"))
    }
    if (userFio) {
        return next(ApiError.NotFound("Пользователь под данными именем уже существует!"))
    }
    if (userPhone) {
        return next(ApiError.NotFound("Данный номер телефона уже существует!"))
    }

    next()
}

async function update(req, res, next) {
    const { id, email, fio, phone } = req.body
    if (!id) {
        return next(ApiError.NotFound("Некорректно указан номер пользователя!"))
    }
    if (!email) {
        return next(ApiError.NotFound("Некорректно указана почта пользователя!"))
    }
    if (!fio || fio.split(' '.length < 2)) {
        return next(ApiError.NotFound("Некорректно указано Ф.И.О. пользователя!"))
    }
    if (!phone) {
        return next(ApiError.NotFound("Некорректно указан номер телефона пользователя!"))
    }

    const userEmail = await User.findOne({ where: { email } })
    const userFio = await User.findOne({ where: { fio } })
    const userPhone = await User.findOne({ where: { phone } })

    if (userEmail) {
        return next(ApiError.NotFound("Данная почта уже существует!"))
    }
    if (userFio) {
        return next(ApiError.NotFound("Пользователь под данными именем уже существует!"))
    }
    if (userPhone) {
        return next(ApiError.NotFound("Данный номер телефона уже существует!"))
    }

    next()
}

module.exports = {
    getOne,
    deleteOne,
    create,
    update
}