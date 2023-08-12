const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const relatedItemsSchema = new Schema({   
    Name: {
        type : String,
        required : true
    },
    category: {
        type : String,
        required : true
    },
    company: {
        type : String,
        required : true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      ProviderId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    description: {
        type : String,
        required : true
    },
    color: {
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true,
    },
    totalQuantity:{
        type : Number,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    salePrice:{
        type : Number,
        required : true,
    },
    size:{
        type : String,
        required : false,
    },
    vapePuff: {
        type : Number,
        required : false
    },
    chargeVape: {
        type : String,
        required : false
    },
     juice: {
        type : String,
        required : false
    },
    UsersIdFavorite: {
        type : Array,
        required : false
    },
    quantity:{
        type : Number,
        required : false,
        default : 1
    },
    rate: {
        type: Array,
        required: false,
      },
      rating: {
        type: String,
        required: false,
        default: "5",
      },
      UsersIdRate: {
        type: Array,
        required: false,
      },

    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('relatedItems',relatedItemsSchema);




    