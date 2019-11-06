const express = require('express');
const router = express.Router();

router.get('/webApp', (req, res, next) => {
    res.render('../../../stimuli/build/index.html')
    // res.render
    // return res.sendStatus(200).end();
});

module.exports = router;