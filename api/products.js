import fs from "fs";
import path from "path";
import xml2js from "xml2js";

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "urunler.xml");
    const xmlData = fs.readFileSync(filePath, "utf8");

    const parser = new xml2js.Parser();
    const jsonData = await parser.parseStringPromise(xmlData);

    res.status(200).json(jsonData);
  } catch (err) {
    res.status(500).json({ error: "XML okunamadı veya parse edilemedi", details: err.message });
  }
}
