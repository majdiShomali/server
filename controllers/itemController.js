// 1- calling the model
const Item = require("../models/items");

const allItems = (req, res) => {
    Item.find()
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const OneItem = (req, res) => {
  const id = req.params.id;
  Item.findById(id) 
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const allCartItems = (req, res) => {
  const { Ids } = req.body;
  Item.find({ _id: { $in: Ids } })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const addItem =  async (req, res) => {
  const image = req.file.path
     const { Name, description , price } = req.body;
      const item = new Item({ Name: Name, description: description,price:price,image:image });
      const newItem = await item.save();
      res.json(newItem);
};

const updateItemFav = async (req, res) => {
  const cardId = req.params.id;
  const { UsersIdFavorite } = req.body;
  const game = await Item.findByIdAndUpdate(cardId, { UsersIdFavorite: UsersIdFavorite }, { new: true });
  res.json(game);
};

const favoriteItems = (req, res) => { 
  const userId = req.params.id;
  Item.find({ UsersIdFavorite: { $in: [userId] } })
    .then((data) => {
      res.json(data);

    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

module.exports = {
  allItems,
  addItem,
  updateItemFav,
  favoriteItems,
  allCartItems,
  OneItem,
}; 

