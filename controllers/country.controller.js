const { Types } = require('mongoose')
const Country = require('../models/country.model');

const listAllCountries = async (_req, res, next) => {
  try {
    const countries = await Country.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(countries);
  } catch (err) {
    next(err);
  }
};

const getOneCountry = async (req, res, next) => {
    try {
      const { country_id } = req.params;      
      if (!Types.ObjectId.isValid(country_id)) {
        return res.status(400).json({ message: 'Invalid country id' });
      }
  
      const country = await Country.findById(country_id).select(
        '-createdAt -updatedAt');
        
      if (!country) {
        return res.status(404).json({ message: 'Country not found' });
      }
      res.status(200).json(country);
    } catch (err) {
      next(err);
    }
};

module.exports = {
    listAllCountries,
    getOneCountry,
}
