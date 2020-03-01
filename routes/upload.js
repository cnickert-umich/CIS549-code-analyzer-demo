var express = require('express');
var router = express.Router();

router.post('/js', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No files uploaded'
      });
    } else if (!req.body || !req.body.extName) {
      res.send({
        status: false,
        message: 'Extention name is required.'
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
        console.log("file: ", jsFile);
        let isJsFile = jsFile.mimetype == 'application/javascript';
        if (isJsFile) {
          let fileName = jsFile.name;
          jsFile.mv(`${uploadFolder}/${fileName}`);         //Use the mv() method to place the file in upload directory (i.e. "uploads")
          fileNames.push(fileName);
        }
      }

      //send response
      res.send({
        status: true,
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
