const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
let notes = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  var newNote = req.body;
  newNote.id = uuidv4();
  res.sendFile(path.join(__dirname, "/db/db.json"));
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    let newTask = JSON.parse(data);
    newTask.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(newTask), "utf-8", (err) => {
      if (err) throw err;
      console.log("success");
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`api server now on port ${PORT}!`);
});
