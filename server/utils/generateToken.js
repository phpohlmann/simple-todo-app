const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // O token expira em 30 dias
  });
};

module.exports = generateToken;