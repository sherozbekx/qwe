const express = require("express");
const router = express.Router()
const {
    create,
    getAll,
    getOne,
    search,
    updateOne
} = require("../controller/videoController");



router.post("/api/video/create", create)

router.get("/api/video/all", getAll)
router.get("/api/video/search", search)
router.get("/api/video/:videoId", getOne)

router.put("/api/video/:videoId", updateOne)



module.exports = router