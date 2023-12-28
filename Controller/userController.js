const firebase = require('../config/firebase');
const firestore = firebase.firestore();
const fs = require('fs')
const jwt = require('jsonwebtoken');
const path = require('path')
const { validationResult } = require('express-validator')

module.exports.addUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            image: req.file.path,
        };


        const docRef = firestore.collection('user').doc();


        await docRef.set(data);

        return res.json({ "status": 200, "msg": "Record Successfully Inserted", data });
    } catch (error) {

        console.error(error);
        return res.status(500).json({ "status": 500, "msg": "Internal Server Error" });
    }

}

module.exports.viewData = async (req, res, next) => {
    try {
        let id = req.query.id;

        if (!id) {
            return res.status(400).json({ msg: "Enter valid params" });

        }

        const docRef = firestore.collection('user').doc(id);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            const data = docSnapshot.data();
            return res.status(200).json({ msg: "Success", data });
        } else {
            return res.status(400).json({ msg: "No data found" });
        }
    } catch (error) {

        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports.viewAllUser = async (req, res, next) => {
    try {

        const querySnapshot = await firestore.collection('user').get();

        const allUsers = [];
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            allUsers.push(userData);
        });

        return res.status(200).json({ "status": 200, "msg": "Success", "data": allUsers });
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ msg: "Enter valid params" });
        }
        const fire = firestore.collection('user').doc(id);
        const base = await fire.get();
        const data = base.data();
        if (data.image) {
            fs.unlinkSync(path.join(__dirname, '..', data.image));
        }

        const docRef = firestore.collection('user').doc(id);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            await docRef.delete();
            return res.status(200).json({ msg: "User successfully deleted" });
        } else {
            return res.status(400).json({ msg: "User not found" });
        }
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ msg: "Enter valid params" });
        }
        const fire = firestore.collection('user').doc(id);
        const base = await fire.get();
        const data = base.data();
        if (data.image) {
            // fs.unlinkSync(path.join(__dirname, '..', data.image));
        }

        const docRef = firestore.collection('user').doc(id);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {

            const updatedData = {};
            if (req.body.name) updatedData.name = req.body.name;
            if (req.body.email) updatedData.email = req.body.email;         
            if (req.body.phone) updatedData.phone = req.body.phone;
            if (req.body.password) updatedData.password = req.body.password;
            if (req.file.path) updatedData.image = req.file.path;

            await docRef.update(updatedData);

            return res.status(200).json({ msg: "User successfully updated", updatedData });
        } else {
            return res.status(400).json({ msg: "User not found" });
        }
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        res.status(200).json({ message: 'User registered successfully', user: userCredential.user });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', message: error.message });
    }
}
