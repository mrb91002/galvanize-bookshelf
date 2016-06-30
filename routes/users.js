'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  const userInfo = req.body;

  if (!userInfo.email || userInfo.email.trim() === '') {
    res.set('Content-Type', 'text/plain');
    return res.status(400).send('Email must not be blank');
  }

  if (!userInfo.password || userInfo.password.trim() === '') {
    res.set('Content-Type', 'text/plain');
    return res.status(400).send('Password must not be blank');
  }

  knex('users')
    .where('email', userInfo.email)
    .then((users) => {
      if (users.length > 0) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send('Email already exists');
      }

      bcrypt.hash(userInfo.password, 12, (hashErr, hashed_password) => {
        if (hashErr) {
          next(hashErr)
        }

        knex('users')
          .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            hashed_password: hashed_password
          })
          .then((users) => {
            res.send(200);
          })
          .catch((err) => {
            next(err);
        });
      });
    })
    .catch ((err) => {
      next(err);
    });
  });

module.exports = router;
