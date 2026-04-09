const blogModel = require("../model/blog.model");
const imagekit = require("../utils/imagekitconfig");

// ✅ Add Blog
const addBlog = async (req, res) => {
  try {
    const { topic, desc } = req.body;
    const image = req.file;

    // upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "blog",
    });

    // save in DB
    const blog = await blogModel.create({
      topic,
      desc,
      img: imgResult.url,
    });

    return res.status(201).json({
      message: "Blog added successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error adding blog",
      error: error.message,
    });
  }
};

// ✅ Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const singleblog = await blogModel.findById(id);

      if (!singleblog) {
        res.status(400).json({ message: "Error fetching blogitem" });
      }

      if (singleblog) {
        res
          .status(200)
          .json({ message: "fetch blogitem successfully", data: singleblog });
      }
    }

    const blogs = await blogModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, desc } = req.body;
    const image = req.file;

    let updateData = {};

    if (topic) updateData.topic = topic;
    if (desc) updateData.desc = desc;

    // if new image uploaded
    if (image) {
      const imgResult = await imagekit.files.upload({
        file: image.buffer.toString("base64"),
        fileName: image.originalname,
        folder: "blog",
      });

      updateData.img = imgResult.url;
    }

    const updated = await blogModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating blog",
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await blogModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting blog",
      error: error.message,
    });
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
