const express = require('express');
const router = express.Router();


const siteController = require('../app/controllers/siteController');

router.get('/search', siteController.Search);
router.get('/', siteController.Index);

module.exports = router;