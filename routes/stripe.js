const router = require("express").Router();
const stripe = require("stripe")('sk_test_51IcitgFDr39WI5VWdDxyN6soaAHwWZuhd9vAoHlBUqHEB9wjRqyUSjXuxz6wfIhfg3oWgDKXrCwSohYT84wHq4dy00M66BTXYo');

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source:req.body.tokenId,
        amount: req.body.amount,
        currency:"aud",
    }, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    })
})

module.exports = router;
