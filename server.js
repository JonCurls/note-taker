// import the blah blahs
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
let notes = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// user GET request to the Notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// user GET request for the JSON db
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
  let results = notes;
});

// user POST request to add new Task
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // reads the users input
    if (err) throw err;
    let newNote = req.body;
    newNote.id = uuidv4(); // create unique ID
    let newTask = JSON.parse(data);
    newTask.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(newTask), "utf8", (err) => {
      // writes to db
      if (err) throw err;
      console.log("successfully added!");
      res.json(newNote);
    });
  });
});

// Catch-all for non specific pages
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// page listener
app.listen(PORT, () => {
  console.log(`api server now on port ${PORT}!`);
});
