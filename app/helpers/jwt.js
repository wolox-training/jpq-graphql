const jwt = require('jwt-simple');
const moment = require('moment');
const { secret, expired_quantity, expired_measure } = require('../../config').common.session;
const { tokenError } = require('../errors');

exports.createToken = user => {
  const expiresIn = moment().add(expired_quantity, expired_measure);

  const payload = {
    sub: user.id,
    userId: user.id,
    email: user.email,
    iat: moment().unix(),
    exp: expiresIn.unix()
  };

  const token = jwt.encode(payload, secret);

  return {
    accessToken: token,
    refreshToken: token,
    expiresIn: expiresIn.unix()
  };
};

exports.decodeToken = token => {
  try {
    const payload = jwt.decode(token, secret);

    return payload;
  } catch (error) {
    throw tokenError(error.message);
  }
};
