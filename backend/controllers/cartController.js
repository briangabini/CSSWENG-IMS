const Cart = require('../models/cartModel')
const InventoryItem = require('../models/inventoryItemModel')
const mongoose = require('mongoose')

const removeItemFromCart = async (req, res) => {
    const { user, partName, brand } = req.body;

    try {
        const cart = await Cart.findOne({ userEmail: user });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the index of the item in the cartItems array
        const itemIndex = cart.cartItems.findIndex(
            (item) => item.partName === partName && item.brand === brand
        );

        // If the item is found, decrease stockNumber or remove it from the array
        if (itemIndex !== -1) {
            const item = cart.cartItems[itemIndex];

            if (item.stockNumber > 1) {
                // Decrease stockNumber by one
                item.stockNumber -= 1;
            } else {
                // If stockNumber is already 1, remove the item from the array
                cart.cartItems.splice(itemIndex, 1);
            }

            await cart.save();
            return res.status(200).json({ message: 'Item removed from cart' });
        } else {
            return res.status(404).json({ error: 'Item not found in the cart' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const addItemToCart = async (req, res) => {
    const { user, partName, brand } = req.body;
    const array = [];
    itemIndex = -1;

    try {
        const cart = await Cart.findOne({ userEmail: user });

        if (!cart) {
            cart = await Cart.create({ userEmail: user, array })
            res.status(200).json(cart)
        }

        // Find the index of the item in the cartItems array
        if (cart.cartItems.length !== 0) {
            itemIndex = cart.cartItems.findIndex(
                (item) => item.partName === partName && item.brand === brand
            );
        }

        // If the item is found, increase stockNumber by one
        if (itemIndex !== -1) {
            cart.cartItems[itemIndex].stockNumber += 1;
        } else {
            // If the item is not found, add a new item with stockNumber 1
            const newItem = await InventoryItem.findOne({ partName, brand });

            if (!newItem) {
                return res.status(404).json({ error: 'Item not found in inventory' });
            }

            cart.cartItems.push({
                partName: newItem.partName,
                brand: newItem.brand,
                motorModel: newItem.motorModel,
                stockNumber: 1,
                wholesalePrice: newItem.wholesalePrice,
                retailPrice: newItem.retailPrice,
                stockStatus: newItem.stockStatus,
            });
        }

        await cart.save();
        return res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    removeItemFromCart,
    addItemToCart
}