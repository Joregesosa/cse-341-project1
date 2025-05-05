const router = require('express').Router();
const {
  index,
  show,
  create,
  remove,
  update,
} = require('../controllers/contacts');

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
