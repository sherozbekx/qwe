const VideoModel = require("../model/videoModel");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.create = async (req, res, next) => {
    try {   
        const { NAME, DESCRIPTION, CATEGORYID } = req.body;
        if(
            NAME == undefined || !NAME ||
            DESCRIPTION == undefined || !DESCRIPTION ||
            CATEGORYID == undefined || !CATEGORYID
         ) {
            res.json({ status: false })
        }   
        else { 
            const video = new VideoModel({
                name: NAME,
                description: DESCRIPTION,
                categoryId: CATEGORYID
            })
            await video.save()
            res.json({status: true, data: video})
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
        if (status != "all") {
            dts.push({ $match: { status: { $in: status } } });
        }

        const data = await VideoModel.aggregate(dts)
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
        const { videoId } = req.params
        const data = await VideoModel.findById({ _id: videoId });
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
        const data = await VideoModel.find({ status: { $in: STATUS }});
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
        const { videoId } = req.params
        const data = await VideoModel.findByIdAndUpdate({ _id: videoId })
        Object.assign(data, req.body)
        await data.save()
        res.json({ status: true, data: data })
    }
    catch (error) {
        res.json({ status: false, error: error.message })
    }
}