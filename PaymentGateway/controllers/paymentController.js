const RazerPayInstance = require("../razorpayconf");
const crypto = require("crypto");
const { Payment } = require("../models/paymentModel")

exports.checkOut = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount) * 100, // 100 because of multiplication to paise
            currency: "INR",
            receipt: "orders_recived"
        };

        // info store packages and user chi 
        const order = await RazerPayInstance.orders.create(options);
        console.log(order);
        return res.status(200).json({ order, success: true });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ err, success: false });
    }
}

exports.paymentVerified = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;
        console.log(isAuthentic);

        if (isAuthentic) {
            // Database comes here
            // if authentiated order id varun user chi info milel ani coins add hotil 
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            res.redirect(
                `http://localhost:3001/paymentsuccess?reference=${razorpay_payment_id}`
            );
        } else {
            res.status(400).json({
                success: false,
                message: "Payment Not Verified"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err, success: false });
    }
}

exports.getKey = async (req, res) => {
    try {
        console.log("key");
        let key = process.env.RAZORPAY_API_KEY;
        return res.status(200).json({
            key
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ err, success: false });
    }
}