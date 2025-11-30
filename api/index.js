const express = require('express');
const cors = require('cors');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ana sayfa
app.get('/', (req, res) => {
  res.send('Merhaba, API çalışıyor!');
});

// XML dosyasını JSON'a çevirip döndüren route
app.get('/products', (req, res) => {
  const xmlFile = './data/products.xml'; // XML dosyanın yolu

  fs.readFile(xmlFile, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'XML dosyası okunamadı' });
    }

    xml2js.parseString(data, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'XML parse edilemedi' });
      }
      res.json(result);
    });
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
