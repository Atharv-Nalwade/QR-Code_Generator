const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const validUrl = require('valid-url');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
  try {
    const url = req.body.url;

    if (!validUrl.isUri(url)) {
      return res.status(400).json({
        message: 'Invalid URL'
      });
    }

    const qrCode = await QRCode.toBuffer(url);
    res.set('Content-Type', 'image/png');
    res.send(qrCode);
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

app.listen(3000, () => {
  console.log('Server started on 3000');
});
