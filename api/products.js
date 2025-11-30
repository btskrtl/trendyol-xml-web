// api/products.js
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

export default async function handler(req, res) {
  const xmlFile = path.join(process.cwd(), 'urunler.xml'); // XML dosyanın kök dizindeki yolu

  try {
    const data = fs.readFileSync(xmlFile, 'utf-8');             // XML dosyasını oku
    const result = await xml2js.parseStringPromise(data, { explicitArray: false }); // XML → JSON
    res.status(200).json(result);                               // JSON olarak gönder
  } catch (err) {
    res.status(500).json({ error: 'XML dosyası okunamadı veya parse edilemedi' });
  }
}
