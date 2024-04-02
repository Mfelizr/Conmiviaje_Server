const User = require('../models/user.model');
const { creaPass } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  try {
    let { email, username, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: true, message: 'Usuario ya existe' });
    }

    if (!email || !password || !username ) {
       console.log('Favor completar todos los campos' )
      return res.status(400).json({ message: 'Favor completar todos los campos' });      
    }

    const passwordCrypt = creaPass(password);
    const result = await User.create({
      email: email,
      password: passwordCrypt,
      username: username,
      avatar: avatar || undefined,
    });
    res.json({ error: false, message: result });
  } catch (error) {
    next(error)
  }
};

const login = async (req, res) => {
  res.json({
    token: jwt.sign({ user: req.user._id, rol: 'Admin' }, 'secreto', { expiresIn: '1d' }),
  });
};

const verify = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signup,
  login,
  verify
};
