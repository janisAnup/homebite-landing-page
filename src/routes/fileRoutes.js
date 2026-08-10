const router = require('express').Router();
const files = require('../controllers/fileController');

router.get('/', files.list);
router.post('/', files.create);
router.get('/:name', files.read);
router.put('/:name', files.update);
router.post('/:name/append', files.append);
router.patch('/:name/rename', files.rename);
router.delete('/:name', files.remove);
module.exports = router;
