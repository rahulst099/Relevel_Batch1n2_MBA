const constants = require ("../utils/constants");
var ObjectId = require('mongoose').Types.ObjectId;
const Booking = require("../models/booking.model");

validatePaymentRequestBody = async (req, res, next) => {

    //validate the booking id is passed
    if(!req.body.bookingId) {
        return res.status(400).send({
            message : "Failed ! booking is not provided !"
        });

    }
    //Validate the booking id is valid
    if(!ObjectId.isValid(req.body.bookingId)) {
        return res.status(400).send({
            message : "Failed! bookingId is not valid format !"
        });

    }

    //validate if the booking exists
    const booking = await Booking.findOne({_id : req.body.bookingId});
    if(booking==null) {
        return res.status(400).send({
            message : "Failed! Booking Id passed doesn't exist !"
        });
    } 

    /**
     * Check the amount 
     */
    if(req.body.amount < booking.totalCost) {
        return res.status(400).send({
            message : "Can't do the payment as the payment amount is less than booking amount "
        })
    }

    next();

}

const verifyPaymentReqBody = {
    validatePaymentRequestBody : validatePaymentRequestBody
}

module.exports = verifyPaymentReqBody;
