const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Contacts API',
  });
});

router.use('/contacts', require('./contacts'));

module.exports = router;
