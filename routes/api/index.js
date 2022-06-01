const router = require('express').Router();
const notesRoutes = require('./notesRoutes');

router.use('/index', notesRoutes);

module.exports = router;