import express from 'express'
import * as controller from '../controllers/auth';

const router = express.Router();

router.post('/login', controller.default.login);

router.delete('/logout', controller.default.logout);

module.exports = router;