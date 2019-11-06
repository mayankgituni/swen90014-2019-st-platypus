const express = require('express');
const router = express.Router();

router.get('/ErrorPage', (req, res, next) => {         
    res.sendStatus(404).end();
});

module.exports = router;