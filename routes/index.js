const router = require('express').Router();

 
router.use('/', require('./swagger'));

router.use('/contacts', require('./contacts')); 

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Contacts API',
  });
}); 

module.exports = router;
