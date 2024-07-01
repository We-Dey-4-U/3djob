const CartItem = require('../models/CartItem');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { id, quantity, customization } = req.body;

  const cartItem = new CartItem({ id, quantity, customization });
  try {
    await cartItem.save();
    res.status(200).send({ message: 'Product added to cart', cartItem });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add product to cart', error });
  }
};

// Approve order
exports.approveOrder = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cartItem = await CartItem.findById(itemId);
    if (!cartItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    cartItem.status = 'approved';
    await cartItem.save();

    res.status(200).send({ message: 'Order approved', cartItem });
  } catch (error) {
    res.status(500).send({ message: 'Failed to approve order', error });
  }
};