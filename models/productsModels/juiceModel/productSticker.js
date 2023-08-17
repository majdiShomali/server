const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const productStickerSchema = new Schema({   
    Name: {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    quantity: {
        type : Number,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    salePrice: {
        type : Number,
        required : true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    RelatedItemId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      ProviderId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('ProductSticker',productStickerSchema);




    