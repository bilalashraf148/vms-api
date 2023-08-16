const db = require("../models");
const ColorTone = db.colorTones;
const Product = db.products;
const formidable = require("formidable");
const fs = require("fs");

exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      res.status(500).json({ message: "Error parsing form data" });
      return;
    }
    let productId = null;
    try {
      const { title, description } = JSON.parse(fields?.product?.[0]) ?? {};
      const product = await Product.create({ title, description });
      productId = product.id;

      const payload = [];
      for (const key in fields) {
        if (key.startsWith("color-")) {
          for(let i = 0; i < fields[key].length; i++) {
            const itemIndex = key.split("-")[1];
            const color = fields[`color-${itemIndex}`][i];
            const tone = fields[`tone-${itemIndex}${i}`][0];
            const shadeFile = files[`shade-${itemIndex}${i}`][0];
            const shadeBuffer = fs.readFileSync(shadeFile.filepath);
            payload.push({ color, tone, shade: shadeBuffer });
          }
        }
      }

      for (const item of payload) {
        await ColorTone.create({
          color: item.color,
          tone: item.tone,
          shade: item.shade,
          productId
        });
      }
      res.status(200).json({ message: "Data and files uploaded and saved successfully" });
    }
    catch (err) {
      console.log("🚀 ~ file: product-color-tone.controller.js:47 ~ form.parse ~ err:", err)
      if (productId) {
        await Product.destroy({ where: { id: productId } });
      }
      res.status(500).json({ message: "Error creating product and color tones" });
    }
  });
};

exports.getAll = async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: ColorTone,
        as: "colorTones",
        attributes: ["id", "color", "tone", "shade"],
      },
    ],
  });

  const serializedData = products.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    colorTones: item.colorTones.map(colorTone => ({
              id: colorTone.id,
              color: colorTone.color,
              tone: colorTone.tone,
              shade: {
                type: "Buffer",
                data: colorTone.shade.toString("base64"),
              },
            }))
  }));
  res.status(200).json(serializedData);
};
