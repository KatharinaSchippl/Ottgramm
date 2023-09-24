const express = require('express');
const webpush = require('web-push');
const router = express.Router();

const publicVapidKey = 'BKc4fh07Ws8qxBiwX8s8QJ8fzfoi7NN2uxklVKOt05jVxyEFS-QNu_EgqnJ-t3MEbScv-JmKwE3rCKl_fTcIf7M';
const privateVapidKey = 'Wxv63FAF35F-6RgWpkmGNvakRUQoA1CauOcX5KA4GDI';

router.post('/', async(req, res) => {
    const subscription = req.body;
    console.log('subscription', subscription);
    res.status(201).json({ message: 'subscription received'});

    webpush.setVapidDetails('mailto:freiheit@htw-berlin.de', publicVapidKey, privateVapidKey);
});

module.exports = router;
