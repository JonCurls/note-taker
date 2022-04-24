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

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// When user access notes page
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// When user adds a new Task
app.post("/api/notes", (req, res) => {
  //   console.log(newNote);
  //   res.sendFile(path.join(__dirname, "./db/db.json"));
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let newNote = req.body;
    newNote.id = uuidv4();
    let newTask = JSON.parse(data);
    newTask.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(newTask), "utf8", (err) => {
      if (err) throw err;
      console.log("successfully added!");
    });
  });
});

// Catch-all for non specific pages
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`api server now on port ${PORT}!`);
});
