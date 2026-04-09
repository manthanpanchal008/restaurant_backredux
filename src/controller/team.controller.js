const teamModel = require("../model/team.model");
const imagekit = require("../utils/imagekitconfig");

const addteam = async (req, res) => {
  try {
    const { name, position, socialmedia } = req.body;
    const image = req.file;

    // Check if profile already exists
    const isProfileExists = await teamModel.findOne({ name });

    if (isProfileExists) {
      return res.status(400).json({ message: "Team member already exists" });
    }

    // Upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "team",
    });

    // Save in DB
    const teammember = await teamModel.create({
      name,
      position,
      socialmedia,
      profile: imgResult.url, // better to store URL only
    });

    return res.status(201).json({
      message: "Team member added successfully",
      data: teammember,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getallteam = async (req, res) => {
  try {

    const {id} = req.params;
    if(id){
      const singleteammember = await teamModel.findById(id)

      if(!singleteammember){
        return res.status(400).json({
          message: "error while fetch team member",
        })
      }

      if(singleteammember){
        return res.status(200).json({
          message: "team member fetch successfully",
          data: singleteammember,
        })
      }
    }

    const team = await teamModel.find();

    return res.status(200).json({
      message: "Team members fetched successfully",
      data: team,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateteam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, socialmedia } = req.body;
    const image = req.file;

    let updateData = {};

    if (name) updateData.name = name;
    if (position) updateData.position = position;
    if (socialmedia) updateData.socialmedia = socialmedia;

    // if new image uploaded
    if (image) {
      const imgResult = await imagekit.files.upload({
        file: image.buffer.toString("base64"),
        fileName: image.originalname,
        folder: "team",
      });

      updateData.profile = imgResult.url;
    }

    const updated = await teamModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    return res.status(200).json({
      message: "Team member updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating team member",
      error: error.message,
    });
  }
};

const deleteteam = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await teamModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    return res.status(200).json({
      message: "Team member deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting team member",
      error: error.message,
    });
  }
};

module.exports = {
  addteam,
  getallteam,
  updateteam,
  deleteteam,
};
