//import firebase config and functions from urls
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-ac289-default-rtdb.firebaseio.com/"
}

//initialize the app with the firebaseconfig with url for database
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

//create reference inside database to push data to
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

//onValue to fetch snapshot of database every time change is made to DB, only run if snapshot exists
onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        //snapshot is in object form, needs to be converted to array
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    //remove data from the DB
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    //push value in input field to database
    push(referenceInDB, inputEl.value)
    //remove input entries from HTML
    inputEl.value = "" 
})