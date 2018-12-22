const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9-_]{2,30}$/).required(),
  password: Joi.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/).required()
});

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username
  };
  
  jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  }, (err, token) => {
    if (err) {
      respondError422(res, next);
    } else {
      res.json({
        token
      });
    }
  });
}

// any route in here is pre-pended with /auth
router.get('/', (req, res) => {
  res.json({
    message: 'Locked'
  });
});

router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users.findOne({
      username: req.body.username
    }).then(user => {
      if (user) {
        const error = new Error('Username already exists. Please choose another one!');
        res.status(409);
        next(error);
      } else {
        bcrypt.hash(req.body.password, 13).then(hashedPassword => {
          const newUser = {
            username: req.body.username,
            password: hashedPassword
          };

          users.insert(newUser).then(insertedUser => {
            createTokenSendResponse(insertedUser, res, next);
          });
        });
      }
    });
  } else {
    res.status(422);
    next(result.error);
  }
});

function respondError422(res, next) {
  res.status(422);
  const error = new Error('Unable to login.');
  next(error);
}

router.post('/login', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users.findOne({
      username: req.body.username
    }).then(user => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result) {
              createTokenSendResponse(user, res, next);
            } else {
              respondError422(res, next);
            }
          });
      } else {
        respondError422(res, next);
      }
    });
  } else {
    respondError422(res, next);
  }
});

module.exports = router;