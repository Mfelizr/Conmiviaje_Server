const { Router } = require('express');
const {
  getFavoriteOffers,
  likeOffer,
  dislikeOffer,
} = require('../controllers/user.controller');
const passport = require('passport');

const router = Router();

router.get(
  '/getFavoriteOffers',
  passport.authenticate('jwt', { session: false }),
  getFavoriteOffers
);
router.put(
  '/likeOffer/:offer_id',
  passport.authenticate('jwt', { session: false }),
  likeOffer
);
router.put(
  '/dislikeOffer/:offer_id',
  passport.authenticate('jwt', { session: false }),
  dislikeOffer
);

module.exports = router;
