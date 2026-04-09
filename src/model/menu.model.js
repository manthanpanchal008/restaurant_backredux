const mongoose = require("mongoose");

// Schema for menu items
const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },      // Item name
    price: { type: Number, required: true },     // Item price
    desc: { type: String, required: true },      // Item description
    category: {                                  // Item category
      type: String,
      enum: ["STARTER", "MAIN", "DESSERT", "DRINKS"],
      required: true,
      default: "MAIN",
    },
    img: { type: String, required: true },      // Image URL
    isVeg: { type: Boolean, default: true },    // Vegetarian flag
    isPopular: { type: Boolean, default: false },// Popular item flag
    rating: {                                    // Rating from 0 to 5
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },
  },
);

const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel; // Export model for use in controllers