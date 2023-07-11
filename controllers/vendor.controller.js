// controllers/VendorController.js
const Vendor = require('../models/vendor.model');

// Create a new vendor profile
exports.createProfile = async (req, res) => {
  try {
    const { name, address, email, phone } = req.body;
    const vendor =await Vendor.create({
      name,
      address,
      email,
      phone,
    });
    res.status(201).send({
        message:"Profile create succefully",
        data:vendor
    })
  } catch (error) {
    res.status(500).send({
        message:"Something went wrong",
        errorMsg:error.message
    })
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).send({
        data:vendors
    })
  } catch (error) {
    res.status(500).send({ 
        message:"Something went wrong",
        error: error.message
     });
  }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404).send({ message:"Vendor not found" });
    } else {
      res.status(200).send({data:vendor})
    }
  } catch (error) {
    res.status(500).send({ 
        message:"Something went wrong",
        error: error.message 
    });
  }
};

// Update vendor details
exports.updateVendor = async (req, res) => {
  try {
    const { name, address, email, phone } = req.body;
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
        email,
        phone,
      },
      { new: true }
    );
    if (!updatedVendor) {
      res.status(404).send({ message: 'Vendor not found' });
    } else {
      res.send(updatedVendor);
    }
  } catch (error) {
    res.status(500).send({ message:"Something went wrong", error: error.message });
  }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndRemove(req.params.id);
    if (!deletedVendor) {
      res.status(404).send({ message: 'Vendor not found' });
    } else {
      res.status(200).send({ message: 'Vendor deleted successfully' });
    }
  } catch (error) {
    res.status(500).send({  message:"Something went wrong",error: error.message });
  }
};
