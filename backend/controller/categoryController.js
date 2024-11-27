const CategoryModel = require("../model/categoryModel");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.create = async (req, res, next) => {
    try {   
        const { NAME, AGE, ADDRESS, RATING } = req.body;
        if(
            NAME == undefined || !NAME ||
            AGE == undefined || !AGE ||
            ADDRESS == undefined || !ADDRESS ||
            RATING == undefined || !RATING
         ) {
            res.json({ status: false })
        }   
        else {
            const category = new CategoryModel({
                name: NAME,
                age: AGE,
                address: ADDRESS,
                rating: RATING
            })
            await category.save()
            res.json({status: true, data: category})
        }
    }
    catch (error) {
        res.json({ status: false, error: error.message })
    }
}
exports.search = async (req, res, next) => {
    try {
        let dts = [];
        const { name, address, rating, age, status } = req.query;

        if (name != "all") {
            dts.push({ $match: { name: { $regex: name, $options: "i" } } });
        }
        if (address != "all") {
            dts.push({ $match: { address: { $regex: address, $options: "i" } } });
        }
        if (age != "all") {
            dts.push({ $match: { age: { $regex: age, $options: "i" } } });
        }
        if (rating != "all") {
            dts.push({ $match: { rating: { $regex: rating, $options: "i" } } });
        }
        if (status != "all") {
            dts.push({ $match: { status: { $in: status } } });
        }

        const data = await CategoryModel.aggregate(dts)
        res.json({
            status: true,
            count: data.length,
            data: data
        })
    }
    catch (error) {
        res.json({ status: false, error: error.message })
    }
}
exports.getOne = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const data = await CategoryModel.findById({ _id: categoryId });
        res.json({
            status: true,
            data: data
        })
    }
    catch (error) {
        res.json({ status: false, error: error.message })
    }
}
exports.getAll = async (req, res, next) => {
    try {
        const { STATUS } = req.query
        const data = await CategoryModel.find({ status: { $in: STATUS }});
        res.json({
            status: true,
            count: data.length,
            data: data
        })
    }
    catch (error) {
        res.json({ status: false, error: error.message })
    }
}
exports.updateOne = async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const data = await CategoryModel.findByIdAndUpdate({ _id: categoryId })
        Object.assign(data, req.body)
        await data.save()
        res.json({ status: true, data: data })
    }
    catch (error) {
        res.json({ status: false, error: error.message })
    }
}