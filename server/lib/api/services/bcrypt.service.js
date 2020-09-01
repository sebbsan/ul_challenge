const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const hashPassword = (plainPassword) => {
  const salt = genSaltSync();
  const hash = hashSync(plainPassword, salt);

  return hash;
};

const comparePassword = (pw, hash) => compareSync(pw, hash);

module.exports = { hashPassword, comparePassword };
