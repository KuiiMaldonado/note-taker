const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const {raw, json} = require("express");


router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname,'../../db/db.json'), 'utf-8', (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

router.post('/notes', (req, res) => {
    if (req.body && req.body.title && req.body.text) {
        const note = {
            title: req.body.title,
            text: req.body.text
        }
        fs.readFile(path.join(__dirname,'../../db/db.json'), 'utf-8', (err, data) => {
            if (err) {
                res.send(err);
            }
            let fileData = JSON.parse(data);
            fileData.push(note);
            console.log(fileData);
            fs.writeFile(path.join(__dirname,'../../db/db.json'), JSON.stringify(fileData), (err) => {
                if (err) {
                    res.send(err);
                }
                res.status(200).send()
            });
        });
    }
    else {
        res.status(400).json('Request body must contain a title and text');
    }
});

router.delete('/notes/:id', (req, res) => {

});

module.exports = router;