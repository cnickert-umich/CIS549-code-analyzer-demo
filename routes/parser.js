var express = require('express');
var router = express.Router();

router.post('/js', async (req, res) => {
  let parseFolder = req.body.extName;
  res.send({
    status: true,
    parseFolder: `${parseFolder}`
  });
});

module.exports = router;
