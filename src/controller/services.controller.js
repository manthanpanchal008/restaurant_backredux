const servicesModel = require("../model/services.model");

const addService = async (req, res) => {
  try {
    const { title, desc, icon } = req.body;

    // check duplicate
    const isExist = await servicesModel.findOne({ title });

    if (isExist) {
      return res.status(400).json({
        message: "Service already exists",
      });
    }

    // create service
    const service = await servicesModel.create({
      title,
      desc,
      icon,
    });

    return res.status(201).json({
      message: "Service added successfully",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding service",
      error: error.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const {id} = req.params;
    if(id){
      const singleservice = await servicesModel.findById(id)

      if(!singleservice){
        return res.status(400).json({
          message: "error while fetch service",
        })
      }

      if(singleservice){
        return res.status(200).json({
          message: "services fetch successfully",
          data: singleservice,
        })
      }

    }
    const services = await servicesModel.find();

    return res.status(200).json({
      message: "services fetch successfully",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching services",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, icon } = req.body;

    const updated = await servicesModel.findByIdAndUpdate(
      id,
      { title, desc, icon },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating service",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await servicesModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting service",
      error: error.message,
    });
  }
};

module.exports = { addService, getAllServices, updateService, deleteService };
