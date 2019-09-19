const bcrypt = require('bcryptjs');

exports.encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
