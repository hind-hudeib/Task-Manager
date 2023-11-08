const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secretKey = 'TRDChfkgkuhJj';

function login(req, res) {
  const { username, password } = req.body;

  const user = userModel.getUser(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  res.json({ token });
}

module.exports = {
  login,
};
