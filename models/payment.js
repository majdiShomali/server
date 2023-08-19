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
    status: {
        type : Boolean,
        required : true,
        default :false
    },
    cardholder: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
    country: {
        type : String,
        required : true
    },
    state: {
        type : String,
        required : true
    },
    address: {
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
    providerId: {
        type: Schema.Types.ObjectId,
        required : false
    },
    orderTime: {
        type : String,
        required : false
    },
    startDeliverTime: {
        type : String,
        required : false
    },
    deliveredTime: {
        type : String,
        required : false
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

