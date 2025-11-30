const express = require("express");
const fs = require("fs");
const xml2js = require("xml2js");

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const xmlData = fs.readFileSync("urunler.xml", "utf8");

    xml2js.parseString(xmlData, { explicitArray: false, trim: true }, (err, result) => {
      if (err) {
        return res.status(500).send("XML parse hatası");
      }

      // Ürünleri JSON olarak ayıklama
      let urunler = result.Root.Urunler.Urun;

      // Eğer tek ürün varsa diziye al
      if (!Array.isArray(urunler)) {
        urunler = [urunler];
      }

      // İstenilen alanları seçerek döndür
      const jsonUrunler = urunler.map(u => ({
        UrunKartiID: u.UrunKartiID,
        UrunAdi: u.UrunAdi,
        Aciklama: u.Aciklama,
        Marka: u.Marka,
        Cinsiyet: u.Cinsiyet,
        Kategori: u.Kategori,
        UrunUrl: u.UrunUrl,
        ToplamAdet: u.ToplamAdet,
        UrunBayiFiyat: u.UrunBayiFiyat,
        Resimler: u.Resimler?.Resim || [],
        Varyasyonlar: u.UrunSecenek?.Secenek ? (Array.isArray(u.UrunSecenek.Secenek) ? u.UrunSecenek.Secenek : [u.UrunSecenek.Secenek]) : []
      }));

      res.json(jsonUrunler);
    });

  } catch (err) {
    res.status(500).send("Dosya okunamadı");
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
