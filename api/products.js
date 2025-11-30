const express = require('express');
const cors = require('cors');
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ana route: API çalışıyor testi
app.get('/', (req, res) => {
  res.send('Merhaba, API çalışıyor!');
});

// /api/products route: XML'i JSON'a çevirip döndür
app.get('/products', (req, res) => {
  const xmlFile = path.join(__dirname, '..', 'urunler.xml');

  fs.readFile(xmlFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'XML dosyası okunamadı' });

    xml2js.parseString(data, { explicitArray: false }, (err, result) => {
      if (err) return res.status(500).json({ error: 'XML parse edilemedi' });

      // JSON'u direkt gönder
      res.json(result);
    });
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
