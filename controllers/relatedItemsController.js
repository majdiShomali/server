// 1- calling the model
const RelatedItems = require("../models/relatedItems");

const addRelatedItem =  async (req, res) => {
    const image = req.file.path

     const {  selectedColor, 
    selectedVapePuff, 
    selectedSize, 
    category, 
    itemId,  
    Name,
    price, 
    salePrice, 
    description, 
    totalQuantity,
    selectedChargeVape,
    isColorChecked, 
    isSizeChecked, 
    isVapePuffChecked, } = req.body; 

const date ={Name:Name,
category:category,
categoryId:itemId,
description:description,
color:selectedColor,
image:image,
totalQuantity:totalQuantity,
price:JSON.parse(price),
salePrice:JSON.parse(salePrice),
size:selectedSize,
chargeVape:selectedChargeVape,
vapePuff:JSON.parse(selectedVapePuff),
quantity:1,
}

      const  item = new RelatedItems(date);  
      const newItem = await item.save();
       res.json(newItem);

    // const NewColors= JSON.parse(isColorChecked)  ?  [{color:selectedColor,image:image}] :[]
    // const NewSize = JSON.parse(isSizeChecked)   ?  [{size:selectedSize,image:image}] : []
    // const NewVapePuff = JSON.parse(isVapePuffChecked)   ?  [{vapePuff:selectedVapePuff,color:selectedColor,image:image}] : []
    // // const accessories=[{color:selectedColor,size:selectedSize,image:image}]
    // const  item = new Item({ Name: Name, description: description,price:price,image:image,ProviderId:ProviderId,totalQuantity:totalQuantity,salePrice:salePrice ,category:category,colors:NewColors,size:NewSize,vapePuff:NewVapePuff });     
    // const newItem = await item.save();
    // res.json(newItem);
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
module.exports = {
    addRelatedItem,
    allRelatedItems,
    RelatedItemsAll,
    OneRelatedItem,
    allCartItems,
    updateItemFav,
    favoriteItems,
    updateProductRate,
}; 


