const Cart = require('../models/cartModel')
const InventoryItem = require('../models/inventoryItemModel')
const mongoose = require('mongoose')

const getCartById = async (req, res) => {
    const user = { _id: req.params.id }

    try {
        const cart = await Cart.findOne({ user })

        if (cart) {
            return res.status(200).json(cart)
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getCartDetailsByUserId = async (req, res) => {
    const userId = req.params.userId

    console.log(userId)

    try {
        // Find the cart document by ID and populate the 'inventoryItems.inventoryItem' field
        const userCart = await Cart.findByUserId(userId);

        if (userCart) {
            console.log('User Cart:', userCart);
            return res.status(200).json(userCart)
        } else {
            console.log('Cart not found for the user.');
            return res.status(400).json({error: 'Cart not found for the user.'})
        }

    } catch (error) { 
        console.error('Error fetching cart details:', error.message); 
        return res.status(400).json({ error: error.message }) 
    }
}

const deductItemFromCart = async (req, res) => {

    const {userId, inventoryId} = req.body

    const userCart = await Cart.findByUserId(userId);

    // console.log('from cartController ', cart)
    // console.log('from cartController ', inventoryId)

    try {
        await userCart.deductItemFromCart(inventoryId)

        return res.status(200)
    } catch (error) {

        console.error('Error deleting item from cart:', error.message)
        return res.status(400).json({ error: error.message })
    }
}

const addItemToCart = async (req, res) => {

    const { userId, inventoryId } = req.body

    const userCart = await Cart.findByUserId(userId);

    try {
        await userCart.addItemToCart(inventoryId)

        return res.status(200)
    } catch (error) {

        console.error('Error adding item to cart:', error.message)
        return res.status(400).json({ error: error.message })
    }
}

const confirmOrder = async (req, res) => {
    const { userId } = req.body

    const userCart = await Cart.findByUserId(userId)

    try {
        await userCart.confirmOrder()

        return res.status(200)
    } catch (error) {

        console.error('Error confirming order:', error.message)
        return res.status(400).json({ error: error.message })
    }
}

const cancelOrder = async (req, res) => {
    const { userId } = req.body

    const userCart = await Cart.findByUserId(userId)

    try {
        await userCart.cancelOrder()

        return res.status(200)
    } catch (error) {

        console.error('Error cancelling order:', error.message)
        return res.status(400).json({ error: error.message })
    }
}

const deleteItems = async (req, res) => {
    const {userId, itemIds} = req.body // returns an array containing the ids of items to delete and the user id

    const userCart = await Cart.findByUserId(userId)

    try {
        await userCart.deleteItems(itemIds)

        return res.status(200)
    } catch (error) {
        console.error('Error deleting items:', error.message);
        
        return res.status(400).json({error: error.message})
    }
}

/* const getCartDetailsByUserId = async (req, res) => {
    const userId = req.params.userId

    console.log(userId)

    try {
        // Find the cart document by ID and populate the 'inventoryItems.inventoryItem' field
        const cart = await Cart.findById(cartId).populate('inventoryItems.inventoryItem');

        if (!cart) {
            throw new Error('Cart not found');
        }

        console.log('Cart details:', cart);
        // Access the populated inventory items
        const inventoryItems = cart.inventoryItems.map(item => item.inventoryItem);
        console.log('Populated Inventory Items:', inventoryItems);

        return res.status(200).json(inventoryItems)
    } catch (error) {
        console.error('Error fetching cart details:', error.message);
        return res.status(400).json({ error: error.message })
    }
} */

/* const getCartDetails = async (req, res) => {
    const cartId = req.params.cartId

    console.log(cartId)

    try {
        // Find the cart document by ID and populate the 'inventoryItems.inventoryItem' field
        const cart = await Cart.findById(cartId).populate('inventoryItems.inventoryItem');

        if (!cart) {
            throw new Error('Cart not found');
        }

        console.log('Cart details:', cart);
        // Access the populated inventory items
        const inventoryItems = cart.inventoryItems.map(item => item.inventoryItem);
        console.log('Populated Inventory Items:', inventoryItems);

        return res.status(200).json(inventoryItems)
    } catch (error) {
        console.error('Error fetching cart details:', error.message);
        return res.status(400).json({ error: error.message })
    }
} */

module.exports = {
    getCartById,
    // getCartDetails
    getCartDetailsByUserId,
    deductItemFromCart,
    addItemToCart,
    cancelOrder,
    confirmOrder,
    deleteItems
}