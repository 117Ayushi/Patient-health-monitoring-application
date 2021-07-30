import jwt from 'jsonwebtoken';


import User from '../models/user';

let JWT_SECRET = "I_will_win_definitely";


export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
      let token = authorizationHeader.split(' ')[1];
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({
            error: 'Failed to authenticate'
          });
        } else {
          User.query({
            where: {
              id: decoded.id
            },
            select: ['email', 'id', 'role', 'name', 'mobile', 'age', 'address']
          }).fetch().then(user => {
            if (!user) {
              res.status(404).json({
                error: 'No such user'
              });
            } else {
              req.currentUser = user;
              next();
            }
          });
        }

      });
    } else {
      res.status(403).json({
        error: 'No token provided'
      });
    }
}
