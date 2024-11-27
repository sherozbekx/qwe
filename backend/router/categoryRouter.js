const express = require("express")
const router = express.Router()
const {
    create,
    getAll,
    getOne,
    search,
    updateOne
} = require("../controller/categoryController")


router.post("/api/category/create", create)

router.get("/api/category/all", getAll)
router.get("/api/category/search", search)
router.get("/api/category/:categoryId", getOne)

router.put("/api/category/:categoryId", updateOne)

module.exports = router