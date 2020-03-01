var express = require('express');
var router = express.Router();


router.post('/js', async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).send({
        message: 'JavaScript Files are required. [jsFiles]'
      });
    } else if (!req.body || !req.body.extName) {
      res.status(400).send({
        message: 'Extention name is required. [extName]'
      });
    } else {
      //Get the files and if they only upload one, lets throw it into an array anyways
      let jsFiles = req.files["jsFiles"];
      let extName = req.body.extName;

      let uploadFolder = `./uploads/${extName}`;

      if (!Array.isArray(jsFiles)) {
        let temp = [];
        temp.push(jsFiles);
        jsFiles = temp;
      }

      let fileNames = [];
      for (let i = 0; i < jsFiles.length; i++) {
        let jsFile = jsFiles[i];
        //Only allow .js files to be uploaded
        let isJsFile = jsFile.mimetype == 'application/javascript';
        if (isJsFile) {
          let fileName = jsFile.name;
          jsFile.mv(`${uploadFolder}/${fileName}`);         //Use the mv() method to place the file in upload directory (i.e. "uploads")
          fileNames.push(fileName);
        }
      }

      if (fileNames.length == 0) {
        res.status(400).send({
          message: 'No JavaScript files detected in request.'
        });
      }

      //send successful response
      res.send({
        message: 'JavaScript Files uploaded',
        data: {
          filesUploaded: fileNames,
          uploadFolder: uploadFolder
        }
      });

    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
