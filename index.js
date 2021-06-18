'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');
const Router = express.Router;
const upload = multer({ dest: 'upload/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 9000
const { filterCSV } = require('./config')
    
router.post('/', upload.single('file'), function (req, res) {
  const fileRows = [];
  csv.parseFile(req.file.path)
    .on("data", function (data) {
        fileRows.push(filterCSV(data)); 
    })
    .on("end", function () {
      
      fs.unlinkSync(req.file.path);
      
      const orignalFileName = req.file.originalname.split('.')[0] 
      
      const ws = fs.createWriteStream("upload/" + orignalFileName +  Date.now() + ".csv");
      
      csv.write(fileRows, { headers: true }).pipe(ws);

      return res.status(200).send({ message: 'saved' });

    })


    
});

app.use('/upload-csv', router);

server.listen(port, function () {
    console.log('Express server listening on ', port);
});

module.exports = app