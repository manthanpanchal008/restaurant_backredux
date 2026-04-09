// const galleryModel = require("../model/gallery.model");
const eventsModel = require("../model/events.model")
const imagekit = require("../utils/imagekitconfig");    

// ✅ Add Gallery Image
const addgallary = async (req, res) => {
  try {
    const { category } = req.body;
    const image = req.file;
    console.log(image)
    // Upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "events", // better folder name
    });

    // Save in DB
    const newImage = await eventsModel.create({
        category,
      img: imgResult.url, // store only URL
    });

    return res.status(201).json({
      message: "Image added to gallery",
      data: newImage,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error adding gallery image",
      error: error.message,
    });
  }
};

// ✅ Get All Gallery Images
const getallgallary = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.query;

    // ✅ If ID is provided → return single item
    if (id) {
      const image = await eventsModel.findById(id);

      if (!image) {
        return res.status(404).json({
          message: "Image not found",
        });
      }

      return res.status(200).json({
        message: "Single image fetched",
        data: image, // ✅ object (not array)
      });
    }

    // ✅ Otherwise → build filter
    let filter = {};

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const images = await eventsModel.find(filter);

    return res.status(200).json({
      message: "Images fetched successfully",
      data: images,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching gallery",
      error: error.message,
    });
  }
};
const updategallary = async (req, res) => {
    try {
      const { id } = req.params;
      const { category } = req.body;
      const image = req.file;
  
      let updateData = {};
  
      // update category if provided
      if (category) {
        updateData.category = category;
      }
  
      // if new image uploaded → upload to ImageKit
      if (image) {
        const imgResult = await imagekit.files.upload({
          file: image.buffer.toString("base64"),
          fileName: image.originalname,
          folder: "events",
        });
  
        updateData.img = imgResult.url;
      }
  
      const updated = await eventsModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({
          message: "Gallery item not found",
        });
      }
  
      return res.status(200).json({
        message: "Gallery updated successfully",
        data: updated,
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Error updating gallery",
        error: error.message,
      });
    }
  };

const deletegallary = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await eventsModel.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({
          message: "Gallery item not found",
        });
      }
  
      return res.status(200).json({
        message: "Gallery deleted successfully",
      });
  
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting gallery",
        error: error.message,
      });
    }
  }; 
module.exports = { addgallary, getallgallary ,updategallary,deletegallary};