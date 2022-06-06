const router = require('express').Router();
const User = require('../models/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
//Register===
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET_ENCRYPT
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },

      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );
    const { password, ...others } = savedUser._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN====
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json(`Invalid Email `);
    }
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SECRET_ENCRYPT
    );

    const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json(`Invalid  Password`);
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },

      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
