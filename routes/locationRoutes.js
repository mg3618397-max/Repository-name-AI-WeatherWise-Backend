const express = require('express');
const router = express.Router();
const { addLocation, getLocations, deleteLocation } = require('../controllers/locationController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/', addLocation);
router.get('/', getLocations);
router.delete('/:id', deleteLocation);

module.exports = router;