const adminController = require('../../controllers/v1/adminController');

const router = require('express').Router();

router.route('/admin').get(adminController.index).post(adminController.store);
router
	.route('/admin/:id')
	.get(adminController.show)
	.put(adminController.update)
	.delete(adminController.delete);

module.exports = router;
