const express = require('express')
const route = express.Router();
const Controller = require('../Controller/userController')
const fs = require("fs");
const multer = require("multer");
const validateInputs = require('../Controller/Validation/express-validator')
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname);
    }

});
const upload = multer({ storage: storage }).single("image");

route.post('/create', upload, validateInputs, Controller.addUser);

route.get('/view', Controller.viewData)

route.get('/viewall', Controller.viewAllUser)

route.delete('/delete', Controller.deleteUser)

route.put('/update', upload, validateInputs, Controller.updateUser)

route.get('/login', validateInputs, Controller.login)

module.exports = route


