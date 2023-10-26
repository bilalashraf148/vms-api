const db = require("../models");
const formidable = require("formidable");
const readXlsxFile = require("read-excel-file/node")
const Vehicles = db.vehicles;

const schema = {
  RegistrationNo: {
    prop: "registration",
    type: String,
  },
  VehicleMake: {
    prop: "make",
    type: String,
  },
  Brand: {
    prop: "model",
    type: String,
  },
  City: {
    prop: "city",
    type: String,
  },
};

exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      res.status(500).json({ message: "Error parsing form data" });
      return;
    }
    try {
      console.log("🚀 ~ file: vehicle.controller.js:29 ~ form.parse ~ fields:", fields);
      readXlsxFile(files.file[0].filepath, { schema }).then(async ({ rows } ) => {
        for (const row of rows) {
          await Vehicles.create(row);
        }
      })
      res.status(200).json({ message: "Data and files uploaded and saved successfully" });
    }
    catch (err) {
      console.log("🚀 ~ file: product-color-tone.controller.js:47 ~ form.parse ~ err:", err)
      res.status(500).json({ message: "Error creating product and color tones" });
    }
  });
};

exports.getAll = async (req, res) => {
  const vehicles = await Vehicles.findAll({});
  res.status(200).json(vehicles);
};
