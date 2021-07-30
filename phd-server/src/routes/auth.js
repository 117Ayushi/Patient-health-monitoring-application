import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  User.query({
    where: { mobile: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password'))) {
        const token = jwt.sign({
          id: user.get('id'),
          mobile: user.get('mobile')
        }, "I_will_win_definitely");
        res.json({ token, user: user.attributes});
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'No Patient with above email/mobile' } });
    }
  });
});

export default router;
