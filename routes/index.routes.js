const router = require('express').Router();
const offerRoutes = require('./offer.routes');
const authRoutes = require('./auth.routes');

router.use('/offers', offerRoutes);
router.use('/auth', authRoutes);
router.use('/user', require('./user.routes'));

module.exports = router;
