const mongoose = require("mongoose");

const PaymentModel = new mongoose.Schema(
    {
        razorpay_signature: { type: String },
        razorpay_payment_id: { type: String },
        razorpay_order_id: { type: String }
    }
);

const Payment = mongoose.model('PaymentCheck', PaymentModel, "payment");

module.exports = {
    Payment
}