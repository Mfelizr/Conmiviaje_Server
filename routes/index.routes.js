const router = require('express').Router();
const offerRoutes = require('./offer.routes');
const authRoutes = require('./auth.routes');
const countryRoutes = require('./country.routes');

router.use('/offers', offerRoutes);
router.use('/auth', authRoutes);
router.use('/user', require('./user.routes'));
router.use('/countries', countryRoutes);

module.exports = router;
