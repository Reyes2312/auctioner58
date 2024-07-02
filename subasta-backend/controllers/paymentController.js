const stripe = require('stripe')(process.env.sk_test_51PWPKmHpvu4CPnqAz1at9qibT0sAb6BWEXjfuGBGwSiAlitsTBpXxHlJqLyMY9urdyN2hvF8vlwdFVwBYMEaCc3x00STJ5XJ9d);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    res.json({ paymentIntent });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};
