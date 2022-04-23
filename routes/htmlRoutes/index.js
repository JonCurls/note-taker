const router = require("express").Router();
const noteRoutes = require("../../public/notes.html");

router.use(noteRoutes);

module.exports = router;
