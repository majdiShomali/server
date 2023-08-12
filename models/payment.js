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
    amount: {
        type : Number,
        required : true
    },

},
{timestamps : true}
)

 // 2- export the model with the schema
 module.exports = mongoose.model('Payment',paymentSchema);

