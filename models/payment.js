const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({ 
    paymentMethodId: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    cardholder: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
    amount: {
        type : Number,
        required : true
    },
    itemsCartData: {
        type : Array,
        required : true
    },
    itemsCartDataLocal: {
        type : Array,
        required : true
    },
    startOrderFlag: {
        type : Boolean,
        required : false,
        default: true,
    },
    onWayOrderFlag: {
        type : Boolean,
        required : false,
        default: false,
    },
    deliveredOrderFlag: {
        type : Boolean,
        required : false,
        default: false,
    },

},
{timestamps : true}
)

 // 2- export the model with the schema
 module.exports = mongoose.model('Payment',paymentSchema);

