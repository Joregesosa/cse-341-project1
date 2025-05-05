const router = require('express').Router();
const { serve, setup } = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', serve);
router.get(
  '/api-docs',
  setup(swaggerDocument, { swaggerOptions: { docExpansion: 'none' } }),
);

module.exports = router;
