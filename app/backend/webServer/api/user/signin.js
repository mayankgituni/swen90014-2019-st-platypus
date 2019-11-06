const express = require('express');
const router = express.Router();

router.get('/SignIn', (req, res, next) => {
    return res.sendStatus(200).end();
});

module.exports = router;