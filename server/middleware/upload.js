const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/img/')
  },
  filename: function (req, file, cb) {
    if(!file.originalname.match(/\.(png)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
    cb(null, file.originalname);
    }
  }
})

var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000}
}).single('myfile');

function createImage(req, res) {
  upload(req, res, function(err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400)
          .json({ success: false, message: 'File size is large. Max limit is 10MB'});
      } else if (err.code === 'filetype') {
        res.status(400)
          .json({ success: false, message: 'File type is invalid. Must be .png'});
      } else {
        console.log(err);
        res.status(400)
          .json({ success: false, message: 'File was unable to upload'});
      }
    } else {
      if (!req.file) {
        res.status(400)
          .json({success: false, message: 'No file'});
      } else {
          res.status(201)
            .send(req.file);
      }
    }
  });
}

module.exports = {
    createImage: createImage,
}
