const express = require('express');
const {registerUserctrlr,loginUserCtrlr} = require('./controller');

const router = express.Router();

router.post('/registerUser',registerUserctrlr);
router.post('/login-user',loginUserCtrlr);

module.exports = router;