const programController = require("../controlleur/programController");
const express = require("express");
const router = express.Router();

// Create a new Programs
router.post("/Addprogram", programController.create);

// Retrieve all Programs
router.get("/getprograms", programController.findAll);

// Retrieve a single Programs with id
router.post("/userprogram", programController.findbyUser);

router.delete("/deleteprograms/:id", programController.delete);


module.exports = router;
