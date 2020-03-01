var express = require('express');
var router = express.Router();


var fs = require('fs');
const recast = require("recast");

router.post('/js', async (req, res) => {
  try {
    if (!req.body || !req.body.extName) {
      res.status(400).send({
        message: 'Extention name is required. [extName]'
      });
    } else {

      let extName = req.body.extName;
      let parseFolder = `./uploads/${extName}`;

      let files = fs.readdirSync(parseFolder);

      //handling error
      if (files && Array.isArray(files) && files.length > 0) {

        parseTreeList = [];

        //listing all files using forEach
        files.forEach(function (file) {
          // Do whatever you want to do with the file
          console.log(file);
          let parseFile = `${parseFolder}/${file}`;
          let fileContents = fs.readFileSync(parseFile, 'UTF-8');
          let parseTree = recast.parse(fileContents);
          parseTreeList.push({ "file": file, "tree": parseTree });
        });

        res.send({
          "parseFolder": `${parseFolder}`,
          "parseTrees": parseTreeList
        });
      } else {
        res.status(400).send({
          message: 'No files found to parse.'
        });
      }
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
