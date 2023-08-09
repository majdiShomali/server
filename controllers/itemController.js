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

const ProviderItems = (req, res) => {
    const id = req.params.id;
    Item.find({ProviderId:id})
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
        const { Name, description , price,ProviderId,totalQuantity,salePrice,category,selectedColor,selectedSize,isColorChecked,isSizeChecked,selectedVapePuff,isVapePuffChecked } = req.body;      
        const NewColors= JSON.parse(isColorChecked)  ?  [{color:selectedColor,image:image}] :[]
        const NewSize = JSON.parse(isSizeChecked)   ?  [{size:selectedSize,image:image}] : []
        const NewVapePuff = JSON.parse(isVapePuffChecked)   ?  [{vapePuff:selectedVapePuff,color:selectedColor,image:image}] : []
        // const accessories=[{color:selectedColor,size:selectedSize,image:image}]
        const  item = new Item({ Name: Name, description: description,price:price,image:image,ProviderId:ProviderId,totalQuantity:totalQuantity,salePrice:salePrice ,category:category,colors:NewColors,size:NewSize,vapePuff:NewVapePuff });     
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

const updateProductRate = async (req, res) => {
  const CardId  = req.params.id;
  const updatedItemData = req.body;
  const Product = await Item.findByIdAndUpdate(CardId, updatedItemData, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};

const updateProductQuantity = async (req, res) => {
  const CardId  = req.params.id;
  const updatedItemData = req.body;

  const ProductOr = await Item.findOne({_id:CardId});

  const NewUpdateData ={
    totalQuantity:ProductOr.totalQuantity-updatedItemData.quantity
  }

  const Product = await Item.findByIdAndUpdate(CardId, NewUpdateData, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};

const updateProductColor = async (req, res) => {
  const CardId  = req.params.id;
  const image = req.file.path
  const {selectedColor,itemColors} = req.body;
  const prevColors = JSON.parse(itemColors)
  const NewColors ={colors:[...prevColors,{color:selectedColor,image:image}]}
  const Product = await Item.findByIdAndUpdate(CardId, NewColors, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};
const updateProductSize = async (req, res) => {
  const CardId  = req.params.id;
  const image = req.file.path
  const {selectedSize,itemSizes} = req.body;
  const prevSizes = JSON.parse(itemSizes)
  const NewSizes ={size:[...prevSizes,{size:selectedSize,image:image}]}
  const Product = await Item.findByIdAndUpdate(CardId, NewSizes, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};
const updateProductVapePuff = async (req, res) => {
  const CardId  = req.params.id;
  const image = req.file.path
  const {selectedVapePuff,selectedVapePuffColor,itemVapePuff} = req.body;
  const prevVapePuff = JSON.parse(itemVapePuff)
  const NewVapePuff ={vapePuff:[...prevVapePuff,{vapePuff:selectedVapePuff,vapePuffColor:selectedVapePuffColor,image:image}]}
  console.log(NewVapePuff);
  const Product = await Item.findByIdAndUpdate(CardId, NewVapePuff, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};
const updateProductAccessory = async (req, res) => {
  const CardId  = req.params.id;
  const image = req.file.path
  const {selectedSize,selectedColor,itemAccessories} = req.body;
  const prevAccessories = JSON.parse(itemAccessories)
  const NewAccessories ={accessories:[...prevAccessories,{color:selectedColor,size:selectedSize,image:image}]}
  console.log(NewAccessories)
  const Product = await Item.findByIdAndUpdate(CardId, NewAccessories, { new: true });
  const updatedProduct= await Product.save();
  res.json(updatedProduct);
};

module.exports = {
  allItems,
  addItem,
  updateItemFav,
  favoriteItems,
  allCartItems,
  OneItem,
  updateProductRate,
  ProviderItems,
  updateProductQuantity,
  updateProductColor,
  updateProductSize,
  updateProductAccessory,
  updateProductVapePuff
}; 

