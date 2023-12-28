const express = require('express');
const Controller= require('../Controller/StudentController');
const userRoutes = require('./userRoutes')
const router = express.Router();

router.post('/student',Controller.addStudent);

router.get('/students', Controller.getAllStudents);

router.get('/student', Controller.getStudent);

router.put('/student/:id', Controller.updateStudent);

router.delete('/student/:id', Controller.deleteStudent);


router.use('/user',userRoutes)

module.exports = {
    routes: router
}