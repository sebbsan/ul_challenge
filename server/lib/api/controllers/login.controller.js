/* eslint-disable no-console */
const { comparePassword } = require('../services/bcrypt.service');
const { issue } = require('../services/auth.service');
const db = require('../services/db.service');

const login = async function (req, res) {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }

      if (comparePassword(password, user.password)) {
        const token = issue({ id: user.id });

        return res.status(200).json({ token, user });
      }

      return res.status(401).json({ error: 'Unauthorized' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(400).json({ error: 'Bad Request: Email or password is wrong' });
};

module.exports = login;
