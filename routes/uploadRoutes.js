// uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), (req, res) => {
    // your upload handling logic
});

module.exports = router;