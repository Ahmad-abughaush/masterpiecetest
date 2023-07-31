const Item = require("../models/itemmodel");
const errorHandler = require("../middleware/500");
const User = require('../models/usermodel'); // Adjust the path as needed


const newItem = async (req, res) => {
    const file = req.file.path
    const formData = req.body;

    if (!file) {
        return res.status(422).json({ error: "please upload image" })
    }
    if (file.error) {
        return res.status(422).json({ error: file.error })
    }


    if (!formData.productNAME) {
        return res.status(422).json({ error: "itemName is required" })
    }

    if (!formData.Description) {
        return res.status(422).json({ error: "description is required" })
    }

    if (!formData.Price) {
        return res.status(422).json({ error: "price is required" })
    }

    if (isNaN(parseInt(formData.Price))) {
        return res.status(422).json({ error: "price have to be number" })
    }

    if (!formData.Quantity) {
        return res.status(422).json({ error: "quantity is required" })
    }

    if (isNaN(parseInt(formData.Quantity))) {
        return res.status(422).json({ error: "quantity have to be number" })
    }
    const image = `http://localhost:5000/${file}`
    const newItem = new Item({
        attachments: image,
        itemName: formData.productNAME,
        companyname: formData.companyName,
        description: formData.Description,
        price: parseInt(formData.Price),
        quantity: parseInt(formData.Quantity),
        user_id:  formData.userId
    });

    const item = await newItem.save();
    res.status(201).json(item);
    console.log(item);
};

const allItems = async (req, res) => {
    try {
        if (req.query.itemName) {
            req.query.itemName = { $regex: '.*' + req.query.itemName + '.*' }
        }
        const items = await Item.find(req.query);
        const result = await Promise.all(items.map(async (item) => {
            const user = await User.findById(item.user_id);
            return {
                user,
                item
            }
        }))
        return res.json(result);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};


const getAllItemsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const items = await Item.find({ user_id: userId });
        res.json(items);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



const oneItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'item not found' })
        }
        const user = await User.findById(item.provider_id);
        return res.json({
            user,
            item
        });
    } catch (e) {
        return errorHandler(e, req, res);
    }
}






const updateItem = async (req, res) => {
    const id = req.params.id;
    let data = req.body;

    const item = await Item.findById(id);

    if (!item) {
        return res.status(404).json({ error: 'items not found' });
    }

    if (item.provider_id !== req.user._id.toString()) {
        return res.status(422).json({ error: 'items dose not belong to user' });
    }

    const fillable = [
        'itemName',
        'description',
        'price',
        'quantity',
    ];

    const updateData = {}

    fillable.forEach(function (filterItem) {
        if (data[filterItem]) {
            updateData[filterItem] = data[filterItem];
        }
    }
    );
    updateData.updated_at = Date.now();
    const updatedItem = await Item.findByIdAndUpdate(id, updateData);

    res.json(updatedItem);
};

const deleteItem = async (req, res) => {
    try {

        const id = req.params.id;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'items not found' });
        }
        if (item.provider_id !== req.user._id.toString()) {
            return res.status(422).json({ error: 'items dose not belong to user' });
        }
        const deletedItem = await Item.findByIdAndRemove(id);
        return res.status(200).json({ message: 'item deleted successfully', removedItem: deletedItem });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to remove Item' });
    }
};


module.exports = {
    allItems,
    oneItemById,
    newItem,
    updateItem,
    deleteItem,
    getAllItemsByUserId
}; 
