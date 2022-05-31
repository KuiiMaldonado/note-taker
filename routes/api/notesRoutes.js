const router = require('express').Router();

router.get('/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/notes.html'));

});

router.post('/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.log('POST de notes');
});

router.delete('/notes/:id', (req, res) => {

});

module.exports = router;