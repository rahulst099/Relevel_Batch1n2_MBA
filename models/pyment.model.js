const mongoose = require("mongoose");

/**
 *  The patyment Schema resource
 */
const paymentSchema = new mongoose.Schema({

    bookingId : {
        type : mongoose.SchemaTypes.ObjectId,
        required: true,
        ref : "Booking"
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : "FAILED" 
    },
    createdAt : {
        type : Date,
        immutabe : true,
        default : () => {
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : () => {
            return Date.now();
        }
    }

})

module.exports = mongoose.model("Payment", paymentSchema); 