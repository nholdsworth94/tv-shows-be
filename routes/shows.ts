import express from 'express'
import * as controller from '../controllers/shows';

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.add);

module.exports = router;