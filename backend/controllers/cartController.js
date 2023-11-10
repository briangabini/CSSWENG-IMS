const Cart = require('../models/cartModel')
const InventoryItem = require('../models/inventoryItemModel')
const mongoose = require('mongoose')

// delete item from cart
const deleteCartItemById = async(req, res) => {
    const id = req.params.id 

    // checks if the id variable is in type ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such cart item is found!' })
    }
    
    try {
        const cartItem = await Cart.findByIdAndDelete(id)
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
}

module.exports = {
    deleteCartItemById
}