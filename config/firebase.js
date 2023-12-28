const firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyCL940eyrfHdSiAeoiqWIE8Bj8FtU0Bs8c",
  authDomain: "fir-ab54b.firebaseapp.com",
  databaseURL: "https://fir-ab54b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-ab54b",
  storageBucket: "fir-ab54b.appspot.com",
  messagingSenderId: "693003494087",
  appId: "1:693003494087:web:ea57c07183f42393f8d4e2",
  measurementId: "G-K8GF8FHGSW"
};


const db = firebase.initializeApp(firebaseConfig);

module.exports = db;

