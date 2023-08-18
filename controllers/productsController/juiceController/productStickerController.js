const ProductSticker = require("../../../models/productsModels/juiceModel/productSticker");

const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};


const addProductSticker = async (req, res) => {
  try {
    const data = req.body;
    const image = req.file.path
    console.log(req.body)
 
  } catch (error) {
    errorHandler(error, req, res);
  }
};


const ProductStikers = async (req, res) => {
  const id =req.params.id
  console.log(id)
  ProductSticker.find({RelatedItemId:id})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

module.exports = {
  addProductSticker,
  ProductStikers,

};