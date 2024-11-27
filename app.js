const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { port, host, database } = require('./backend/config/server')


app.use(expressLayouts)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.set("views", path.join(__dirname, "./frontend"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(cors({origin: "*"}))

app.use(require("./backend/router/categoryRouter"))
app.use(require("./backend/router/videoRouter"))


mongoose.connect(database)
.then(() => {
    console.log(`Database running at ${host}:${port}`)
})
.catch((error) => {
    console.log(error.message);
})

app.listen(port, () => {console.log('Server is running');})