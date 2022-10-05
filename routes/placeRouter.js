const placesController = require("../controlleur/placeController");
const express = require("express");
const router = express.Router();

// Create a new Product
router.post("/Addplaces", placesController.create);

// Retrieve all Products
router.get("/getplaces", placesController.findAll);

// Retrieve a single Product with id
router.get("/getplaces/:id", placesController.findOne);

// Retrieve a single Product with city
router.post("/places", placesController.findbyCity);

// Update a Product with id
router.put("/Updateplaces/:id", placesController.update);

// // Delete a Product with id
router.delete("/deleteplaces/:id", placesController.delete);

module.exports = router;