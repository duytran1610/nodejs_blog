const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');


router.get('/stored/courses', meController.StoredCourses);
router.get('/trash/courses', meController.TrashCourses);

module.exports = router;