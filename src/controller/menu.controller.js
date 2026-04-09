const menuModel = require("../model/menu.model");
const imagekit = require("../utils/imagekitconfig");

// Add a new menu item
const additem = async (req, res) => {
  try {
    const { name, price, desc, category } = req.body;
    const file = req.file;

    // Check if item with same name already exists
    const existingItem = await menuModel.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ message: "Item already exists" });
    }

    // Upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: file.buffer.toString("base64"), // convert file to base64
      fileName: file.originalname,
      folder: "food-items",
    });

    // Create new menu item in database
    const newItem = await menuModel.create({
      name,
      price,
      desc,
      category,
      img: imgResult.url, // use uploaded image URL
    });

    res.status(201).json({
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating item",
      error: error.message,
    });
  }
};

//update item
const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, price, desc, category } = req.body;
    const file = req.file;

    const item = await menuModel.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    let updatedData = {};

    if (name) updatedData.name = name;
    if (price) updatedData.price = price;
    if (desc) updatedData.desc = desc;
    if (category) updatedData.category = category;

    // If new image uploaded
    if (file) {
      const imgResult = await imagekit.files.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
        folder: "food-items",
      });

      updatedData.img = imgResult.url;
    }

    const updatedItem = await menuModel.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating item",
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const deletedItem = await menuModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting item",
      error: error.message,
    });
  }
};

const allitem = async (req, res) => {
  try {
    const { category } = req.query;
    const { id } = req.params;
    let filter = {};

    if (id) {
      const singledata = await menuModel.findById(id);
    
    if (!singledata) {
      return res.status(404).json({
        message: "menu item not found",
      });
    }

    return res.status(200).json({
      message: "Single menu item fetched",
      data: singledata, // ✅ object (not array)
    });
  }

    // if category is provided → filter
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const items = await menuModel.find(filter);

    res.status(200).json({
      message: "Items fetched successfully",
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching menu",
      error: error.message,
    });
  }
};
module.exports = { additem, allitem, updateItem, deleteItem };
