const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//1- Create a new schema 
const itemSchema = new Schema({   
    Name: {
        type : String,
        required : true
    },
    ProviderId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    description: {
        type : String,
        required : true
    },
    image:{
        type : String,
        required : true,
    },
    UsersIdFavorite: {
        type : Array,
        required : false
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
    price:{
        type : Number,
        required : true,
    },
    salePrice:{
        type : Number,
        required : true,
    },
    quantity:{
        type : Number,
        required : false,
        default : 1
    },
    totalQuantity:{
        type : Number,
        required : true,
    },
    },
     {timestamps : true}
    )

    // 2- export the model with the schema
    module.exports = mongoose.model('Item',itemSchema);




    