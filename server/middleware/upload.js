/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *******************************************************************/

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'client/public/img/');
  },
  filename: function(req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    } else {
      cb(null, file.originalname);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000
  }
}).single('userfile');


// This function handles all different errors
// could happen when user updates an image file
// If fail, it will return 400 error with detailed info
function createImage(req, res) {
  upload(req, res, function(err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400)
          .json({
            success: false,
            message: 'File size is large. Max limit is 10MB'
          });
          console.log("*** (createImage) ERROR: File size is large. Max limit is 10MB");
      } else if (err.code === 'filetype') {
        res.status(400)
          .json({
            success: false,
            message: 'File type is invalid. Must be .png'
          });
        console.log("*** (createImage) ERROR: File type is invalid. Must be .png");
      } else {
        console.log(err);
        res.status(400)
          .json({
            success: false,
            message: 'File was unable to upload'
          });
        console.log("*** (createImage) ERROR: File was unable to upload");
      }
    } else {
      if (!req.file) {
        res.status(400)
          .json({
            success: false,
            message: 'No file'
          });
        console.log("*** (createImage) ERROR: No file");
      } else {
        res.status(201)
          //.send(req.file);
          .json({
            success: true,
            message: 'File uploaded'
          });
      }
    }
  });
}


module.exports = {
  createImage: createImage,
};
