const express = require("express");
const db = require('./config/firebase')
const studentRoutes = require('./Routes/StudentRoutes');
const path = require('path')
const port = 5200
const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.use('/api', studentRoutes.routes)
app.listen(port, (err) => {
    if (err) {
        console.log("server is running on port", port)
        return false
    }
    console.log("server is running on port", port)
})


