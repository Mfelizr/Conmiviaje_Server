const { Types } = require('mongoose');
const { startOfToday } = require("date-fns");
const Offer = require('../models/offer.model');

const listAllOffers = async (_req, res, next) => {
  try {
    const offers = await Offer.find().populate('country').sort({ createdAt: -1 }).lean();
    res.status(200).json(offers);
  } catch (err) {
    next(err);
  }
};

const listActiveOffers = async (_req, res, next) => {
  try {
    const offers = await Offer.find({ 
        date_start: {$lte: startOfToday()},
        date_end: {$gte: startOfToday()}
     }).populate('country').sort({ createdAt: -1 }).lean();
    res.status(200).json(offers);
  } catch (err) {
    next(err);
  }
};

const getOneOffer = async (req, res, next) => {
  try {
    const { offer_id } = req.params;
    console.log("Ofer ID: ", offer_id)
    if (!Types.ObjectId.isValid(offer_id)) {
      return res.status(400).json({ message: 'Invalid offer id' });
    }

    const offer = await Offer.findById(offer_id).populate('country').select(
      '-createdAt -updatedAt');
      console.log("Res Ofer: ", offer)  
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (err) {
    next(err);
  }
};

const createOneOffer = async (req, res, next) => {
  let {
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
      console.log('Please fill in all fields' )
      return res.status(400).json({ message: 'Please fill in all fields' });      
    } else {
        if (!Number.isInteger(Number(price))) 
          return res.status(400).json({ message: 'Please specify a valid price'});      
        else {
          price= Number(price)}
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
    let {
        country,
        image,
        description,
        price,
        date_start,
        date_end,
        conditions
    } = req.body;

    if (!country && !image && !description && !price && !date_start && !date_end && !conditions) {
      return res.status(400).json({ message: 'Please fill in some fields' });
    }  else {
      if (!Number.isInteger(Number(price))) 
        return res.status(400).json({ message: 'Please specify a valid price'});      
      else {
        price= Number(price)}
  }
  
    if (!Types.ObjectId.isValid(offer_id)) {
      return res.status(400).json({ message: 'Invalid offer id' });
    }

    const offer = await Offer.findByIdAndUpdate(
        offer_id,
      {        
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
      return res.status(404).json({ message: 'Offer not found' });
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
      return res.status(400).json({ message: 'Invalid offer id' });
    }
    const offer = await Offer.findByIdAndDelete(offer_id)
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' })
    }
    res.status(200).json({ message: 'Offer successfully deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  listAllOffers,
  listActiveOffers,
  getOneOffer,
  createOneOffer,
  editOneOffer,
  deleteOneOffer,
}
