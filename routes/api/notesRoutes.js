const router = require('express').Router();
const fs = require('fs');
const path = require('path');


router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname,'../../db/db.json'), 'utf-8', (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

router.post('/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.log('POST de notes');
});

router.delete('/notes/:id', (req, res) => {

});

module.exports = router;