const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


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
            text: req.body.text,
            uuid: uuid.v4()
        }
        fs.readFile(path.join(__dirname,'../../db/db.json'), 'utf-8', (err, data) => {
            if (err) {
                res.send(err);
            }
            let fileData = JSON.parse(data);
            fileData.push(note);
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
    if (req.params.id) {
        let uuid = req.params.id;
        fs.readFile(path.join(__dirname,'../../db/db.json'), 'utf-8', (err, data) => {
            if (err) {
                res.send(err);
            }
            let fileData = JSON.parse(data);
            for (let i = 0; i < fileData.length; i++) {
                if (fileData[i].uuid === uuid) {
                    fileData.splice(i, 1);
                    break;
                }
            }
            fs.writeFile(path.join(__dirname,'../../db/db.json'), JSON.stringify(fileData), (err) => {
                if (err) {
                    res.send(err);
                }
                res.status(200).send()
            });
        });
    }
    else {
        res.status(400).json('Request must contain a note id');
    }
});

module.exports = router;