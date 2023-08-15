// 1- calling the model
const RelatedItems = require("../models/relatedItems");
const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const addRelatedItem = async (req, res) => {
  try {
    const image = req.file.path;
    const data = req.body;
    const Newdata = { ...data, image: image };
    const item = new RelatedItems(Newdata);
    const newItem = await item.save();
    res.json(newItem);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const allRelatedItems = (req, res) => {
    const id = req.params.id;
    RelatedItems.find({categoryId:id})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const RelatedItemsAll = (req, res) => {
    RelatedItems.find()
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const OneRelatedItem = (req, res) => {
    const id = req.params.id;
    RelatedItems.findById(id) 
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
    RelatedItems.find({ _id: { $in: Ids } })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };


  const updateItemFav = async (req, res) => {
    const cardId = req.params.id;
    const { UsersIdFavorite } = req.body;
    const game = await RelatedItems.findByIdAndUpdate(cardId, { UsersIdFavorite: UsersIdFavorite }, { new: true });
    res.json(game);
  };
  
  const favoriteItems = (req, res) => { 
    const userId = req.params.id;
    RelatedItems.find({ UsersIdFavorite: { $in: [userId] } })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };
  
  const updateProductRate = async (req, res) => {
    const CardId  = req.params.id;
    const updatedItemData = req.body;
    const Product = await RelatedItems.findByIdAndUpdate(CardId, updatedItemData, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };

  
  const updateProductQuantity = async (req, res) => {
    const CardId  = req.params.id;
    const updatedItemData = req.body;
  
    const ProductOr = await RelatedItems.findOne({_id:CardId});
    const NewUpdateData ={
      totalQuantity:ProductOr.totalQuantity-updatedItemData.quantity
    }

  
    const Product = await RelatedItems.findByIdAndUpdate(CardId, NewUpdateData, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };


  const updateRelatedItemData = async (req, res) => {
    const CardId  = req.params.id;
    const UpdatedData = req.body.UpdatedData;
    const Product = await RelatedItems.findByIdAndUpdate(CardId, UpdatedData, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };
  
  
  const updateRelatedItemImage = async (req, res) => {
    const CardId  = req.params.id;
    const image = req.file.path
    console.log(image,CardId);
    const Product = await RelatedItems.findByIdAndUpdate(CardId, {image:image}, { new: true });
    const updatedProduct= await Product.save();
    res.json(updatedProduct);
  };


module.exports = {
    addRelatedItem,
    allRelatedItems,
    RelatedItemsAll,
    OneRelatedItem,
    allCartItems,
    updateItemFav,
    favoriteItems,
    updateProductRate,
    updateProductQuantity,
    updateRelatedItemData,
    updateRelatedItemImage,

}; 


