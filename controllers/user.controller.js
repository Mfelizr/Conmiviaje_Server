const User = require('../models/user.model');

const getFavoriteOffers = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const user = await User.findById(user_id).populate('favoriteOffers').exec();
    console.log(user);
    res.status(200).json(user.favoriteOffers);
  } catch (err) {
    next(err);
  }
};

const likeOffer = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { Offer_id } = req.params;

    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { favoriteOffers: Offer_id } },
      { new: true }
    );

    res.status(200).json(userUpdated);
  } catch (err) {
    next(err);
  }
};

const dislikeOffer = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { Offer_id } = req.params;

    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { $pull: { favoriteOffers: Offer_id } },
      { new: true }
    );

    res.status(200).json(userUpdated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFavoriteOffers,
  likeOffer,
  dislikeOffer,
};