import { createRequire } from "module";
// import fetch from 'node-fetch'
const require = createRequire(import.meta.url);

const express = require("express");
const app = express();

import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(filename);

app.use(express.json());

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcD23dlmAxl92EmXnEaAv5fUjj1MQtnKA",
    authDomain: "albertv2test.firebaseapp.com",
    databaseURL: "https://albertv2test-default-rtdb.firebaseio.com",
    projectId: "albertv2test",
    storageBucket: "albertv2test.appspot.com",
    messagingSenderId: "765936931880",
    appId: "1:765936931880:web:655be757e6fda734ed911d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, update, remove, get } from "firebase/database"

const db = getDatabase(firebaseApp);


let semesterData;

function selectData() {
    const dbref = ref(db);

    get(child(dbref, "semesters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                semesterData = snapshot.val();
                // console.log(snapshot.val());
            }
            else {
                console.log("No Data Found");
            }

        })
        .catch((e) => console.log("Error 2", e))
}


// semesterData[0].Courses.ClassSize = 22
function updateData() {
    update(ref(db, "semesters/0/Courses/0/"), { classSize: 100 })
        .then(() => {
            console.log("data updated successfullly");
        })
        .catch((e) => console.log("Error 3:", e))
}


// updateData();

app.use(express.static(path.join(__dirname + "/public")));



app.get("/api/semesters", (req, res) => {

    // fetch("https://albertv2test-default-rtdb.firebaseio.com/semesters.json")
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         res.json(data);
    //     })
    //     .catch(e => console.log("Giving error"))
    selectData();
    res.json(semesterData);
})

// app.use(express.static("/public"));
app.listen(5000, () => console.log("listening on port 5000"));