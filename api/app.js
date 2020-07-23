/* eslint-disable @typescript-eslint/no-var-requires */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();

// app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.get('/halls/:image', (req, res) => {
  fs.readFile(`./public/${req.params.image}.svg`, 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send({
      hall: data,
    });
  });
});

app.put('/halls/:image', (req, res) => {
  const {hall} = req.body;
  fs.writeFile(`./public/${req.params.image}.svg`, hall, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send({
      name: req.params.image,
    });
  });
});

app.post('/upload', (req, res) => {
  const file = req.files.file;
  const name = file.name.replace(' ', '');
  file.mv(`${__dirname}/public/${name}`, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send({
      name,
    });
  });

// console.log(file);
});

app.listen(3200);
