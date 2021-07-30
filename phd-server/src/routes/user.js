import express from 'express';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';

import authenticate from '../middlewares/authenticate';
import commonValidations from '../shared/validations/signup';
import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);
  return User.query({
    where: { email: data.email },
    orWhere: { mobile: data.mobile }
  }).fetch().then(user => {
    if (user) {
      if (user.get('mobile') === data.mobile) {
        errors.mobile = 'There is user with such mobile number';
      }
      if (user.get('email') === data.email) {
        errors.email = 'There is user with such email';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  })

}


router.get('/:identifier', (req, res) => {
  User.query({
    where: { email: req.params.identifier },
    orWhere: { mobile: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});


router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const name = req.body.name;
      const email= req.body.email;
      const role = req.body.role;
      const age = req.body.age;
      const mobile = req.body.mobile;
      const address = req.body.address;
      const password1 = req.body.password;
      const password = bcrypt.hashSync(password1, 10);


      User.forge({
        name, email, role, age, mobile, address, password
      }).save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));

    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
