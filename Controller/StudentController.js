const firestore = require('../config/firebase');
const Student = require('../Model/StudentModel');


const   addStudent = async (req, res, next) => {
    try {
        const studentData = req.body;
        if (studentData) {
            const user_id = studentData.user_id;
            if (!user_id) {
                return res.status(400).json({ "status": 400, "msg": "User ID is required to associate a student with a user." });
            }


            const userRef = firestore.collection('user').doc(user_id);
            const userSnapshot = await userRef.get();
            const data = userSnapshot.data();
            if (!userSnapshot.exists) {
                return res.status(400).json({ "status": 400, "msg": "User with the specified ID not found." });
            }

            const studentRef = firestore.collection('students').doc();
            await studentRef.set(studentData);

            return res.status(200).json({ "status": 200, "msg": "Student Record Successfully Inserted", studentData });
        } else {
            return res.status(400).json({ "status": 400, "msg": "Student Record not Inserted" });
        }
    } catch (error) {
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const querySnapshot = await firestore.collection('students').get();

        if (querySnapshot.empty) {
            return res.status(404).json({ "status": 404, "msg": "No students found " });
        }

        const students = [];
        for (const doc of querySnapshot.docs) {
            const studentData = doc.data();

            const userRef = firestore.collection('user').doc(studentData.user_id);
            const userDoc = await userRef.get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                studentData.user = userData;
            }
            students.push(studentData);
        }

        return res.status(200).json({ "status": 200, "msg": "Students found", "data": students });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const studentId = req.query.id;

        if (!studentId) {
            return res.status(400).json({ "status": 400, "msg": "Student ID is required to fetch a student." });
        }

        const studentRef = firestore.collection('students').doc(studentId);
        const studentDoc = await studentRef.get();

        if (!studentDoc.exists) {
            return res.status(404).json({ "status": 404, "msg": "Student not found." });
        }
        const studentData = studentDoc.data();
        const userRef = firestore.collection('user').doc(studentData.user_id);
        const userDoc = await userRef.get();
        console.log(userDoc, "userDocuserDocuserDoc")
        if (userDoc.exists) {
            const userData = userDoc.data();
            studentData.user = userData;
        }

        return res.status(200).json({ "status": 200, "msg": "Student found", "data": studentData });
    } catch (error) {
        next(error);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student = await firestore.collection('students').doc(id);
        await student.update(data);
        return res.json({ "status": 200, "msg": "Record Successfully Updated", data })

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        let data = await firestore.collection('students').doc(id).delete();
        return res.json({ "status": 200, "msg": "Record Successfully Deleted" })
    } catch (error) {
        console.log(error, "1212121212")
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}