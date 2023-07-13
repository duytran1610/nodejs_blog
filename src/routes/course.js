const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/courseController');


router.get('/create', courseController.Create);
router.post('/store', courseController.Store);
router.post('/handle-form-actions', courseController.HadleFormAction);
router.get('/:id/edit', courseController.Edit);
router.put('/:id', courseController.Update);
router.patch('/:id/restore', courseController.Restore);
router.delete('/:id/force', courseController.Destroy);
router.delete('/:id', courseController.DeleteSort);
router.get('/:slug', courseController.Show);
router.post('/', courseController.Search);

module.exports = router;