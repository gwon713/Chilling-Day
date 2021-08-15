const multer = require('multer');

exports.upload = multer({dest: './upload', limits: { fieldSize: 25 * 1024 * 1024 }});