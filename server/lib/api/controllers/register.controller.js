const db = require('../services/db.service');
const { hashPassword } = require('../services/bcrypt.service');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegexp = /^(?=.*\d)(?=.*\w)([^\s]){8,}$/;

const register = async function (req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName) {
      return res.status(400).send({ error: 'No fullName specified' });
    }
    if (!email) {
      return res.status(400).send({ error: 'No email specified' });
    }
    if (!password) {
      return res.status(400).send({ error: 'No password specified' });
    }

    if (fullName.length <= 5) {
      return res.status(400).send({ error: 'At least 5 characters required for fullName' });
    }

    if (!emailRegexp.test(email)) {
      return res.status(400).send({ error: 'Email is invalid' });
    }

    if (!passwordRegexp.test(password)) {
      return res.status(400).send({ error: 'Password strength not sufficient' });
    }

    const users = await db.User.findAll({
      where: { email },
    });
    if (users.length === 0) {
      const passwordHash = hashPassword(password);

      const createdUser = await db.User.create({
        fullName,
        email,
        password: passwordHash,
      });
      return res.status(201).send(createdUser);
    }
    return res.status(400).send({ error: 'User already exists' });
  } catch (e) {
    return next(e);
  }
};
module.exports = register;
