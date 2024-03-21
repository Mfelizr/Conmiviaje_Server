const { Types } = require('mongoose');
const Offer = require('../models/offer.model');
const Country = require('../models/country.model');
const TravelInformation = require('../models/travelInformation');

const listAllOffers = async (_req, res, next) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(offers);
  } catch (err) {
    next(err);
  }
};

const getOneOffer = async (req, res, next) => {
  try {
    const { offer_id } = req.params;

    if (!Types.ObjectId.isValid(offer_id)) {
      return res.status(400).json({ msg: 'Invalid offer id!' });
    }

    const offer = await offer.findById(offer_id).select(
      '-createdAt -updatedAt'
    );
    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found!' });
    }
    res.status(200).json(offer);
  } catch (err) {
    next(err);
  }
};

const createOneOffer = async (req, res, next) => {
  const {
    country,
    image,
    description,
    price,
    date_start,
    date_end,
    conditions
  } = req.body;
  try {
    if (!country || !image || !description || !price || !date_start || !date_end || !conditions) {
      return res.status(400).json({ msg: 'Please fill in all fields!' });
    }

    await Offer.create({
        country,
        image,
        description,
        price,
        date_start,
        date_end,
        conditions
    });

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const editOneOffer = async (req, res, next) => {
  try {
    const { offer_id } = req.params;
    const {
        country,
        image,
        description,
        price,
        date_start,
        date_end,
        conditions
    } = req.body;

    if (!country || !image || !description || !price || !date_start || !date_end || !conditions) {
      return res.status(400).json({ msg: 'Please fill in all fields!' });
    }
  
    if (!Types.ObjectId.isValid(offer_id)) {
      return res.status(400).json({ msg: 'Invalid offer id!' });
    }

    const offer = await Offer.findByIdAndUpdate(
        offer_id,
      {
        country,
        image,
        description,
        price,
        date_start,
        date_end,
        conditions
      },
      { new: true }
    ).select('-createdAt -updatedAt');

    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found!' });
    }

    res.status(200).json(offer);
  } catch (err) {
    next(err);
  }
};

const deleteOneOffer = async (req, res, next) => {
  try {
    const { offer_id } = req.params;

    if (!Types.ObjectId.isValid(offer_id)) {
      return res.status(400).json({ msg: 'Invalid offer id!' });
    }
    const offer = await Offer.findByIdAndDelete(offer_id)
    if (!offer) {
      return res.status(404).json({ msg: 'Offer not found!' })
    }
    res.status(200).json({ msg: 'Offer successfully deleted!' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  listAllOffers,
  getOneOffer,
  createOneOffer,
  editOneOffer,
  deleteOneOffer,
}
