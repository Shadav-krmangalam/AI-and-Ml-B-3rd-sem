const express = require("express")
const { getNotes, createNote, getNoteById, updateNote, deleteNote } = require("../controllers/notesController")
const { isAuthorized, isLoggedIn } = require("../middlewares/isAuthorized")
const router = express.Router()

router.get("/notes",isLoggedIn,getNotes)
router.get("/notes/:id",isLoggedIn,getNoteById)
router.post("/notes",isLoggedIn,createNote)
router.put("/update-note/:id",isLoggedIn,updateNote)
router.delete("/delete-note/:id",isLoggedIn,deleteNote)

module.exports = router