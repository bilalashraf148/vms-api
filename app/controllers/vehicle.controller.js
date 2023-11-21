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
  Bank: {
    prop: "bankName",
    type: String,
  }
};

exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;
  const chunkSize = 500;
  form.parse(req, async (err, _, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      res.status(500).json({ message: "Error parsing form data" });
      return;
    }
    try {
      // readXlsxFile(files.file[0].filepath, { schema }).then(async ({ rows } ) => {
      //   await Vehicles.bulkCreate(rows);
      //   res.status(200).json({ message: "Data and files uploaded and saved successfully" });
      // });
      const totalChunks = Math.ceil(rows.length / chunkSize);
      // Insert data in chunks
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = rows.slice(start, end);

        await Vehicles.bulkCreate(chunk);
      }
    }
    catch (err) {
      res.status(500).json({ message: "Error creating product and color tones" });
    }
  });
};

exports.getAll = async (req, res) => {
  const vehicles = await Vehicles.findAll({});
  res.status(200).json(vehicles);
};

exports.delete = async (req, res) => {
  try {
    await Vehicles.destroy({ where: { id: req.body } }); 
    res.status(200).json("Data deleted successfully");
  } 
  catch (error) {
    console.error('Error deleting records:', error);
    res.status(500).json({ error: 'Error deleting records' });
  }
};
