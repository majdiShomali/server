const JuiceNikotin = require("../models/juiceNikotin");
const errorHandler = (error, req, res) => {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  };

  const allJuiceNikotin = (req, res) => {
    JuiceNikotin.find()
      .then((data) => { 
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

  const addJuiceNikotin = async (req, res) => {
    try {
      const data = req.body;
      const item = new JuiceNikotin(data);
      const newItem = await item.save();
      res.json(newItem);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
  

module.exports = {
    allJuiceNikotin,
    addJuiceNikotin,
}; 