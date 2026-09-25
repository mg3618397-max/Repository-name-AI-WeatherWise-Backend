const Location = require('../models/Location');

exports.addLocation = async (req, res) => {
  try {
    const { city, country } = req.body;
    const location = await Location.create({ user: req.user.id, city, country });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user.id });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!location) return res.status(404).json({ message: 'Location not found or unauthorized' });
    res.json({ message: 'Location removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};