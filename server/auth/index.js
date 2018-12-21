const express = require('express');

const router = express.Router();

// any route in here is pre-pended with /auth

router.get('/', (req, res) => {
  res.json({
    message: 'Locked'
  });
});

router.post('/signup', (req, res) => {
  console.log('', req.body)

  res.json({
    message: 'Signup'
  });
});

module.exports = router;