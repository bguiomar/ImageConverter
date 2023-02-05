const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });


app.post('/save-image', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    res.send({filename: file.filename})

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


app.get('/read-grey-image/:filename', (req, res) => {
  const { filename } = req.params;

    sharp(path.join(__dirname, 'uploads', filename))
    .greyscale()
    .toFormat('jpeg')
    .toBuffer()
    .then((data) => {
      res.set('Content-Type', 'image/jpeg');
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });

});


app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

