
const Content = require('../models/content.model');

// Upload new content
exports.uploadContent = async (req, res) => {
  try {
    const { title, description, category, vendor, price, isFree } = req.body;
    const content = new Content({
      title,
      description,
      category,
      vendor,
      price,
      isFree,
    });
    await content.save();
    res.status(201).send({
        message:"upload content successful",
        content:content
    });
  } catch (error) {
    res.status(500).send({
        message:"Something went wrong",
    error: error.message
    });
  }
};

// Get all contents
exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find();
    res.status(200).send({
        message:"all contents",
        contents:contents}
        );
  }  catch (error) {
    res.status(500).send({
        message:"Something went wrong",
    error: error.message
    });
  }
};

// Get content by ID
exports.getContentById = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await Content.findById(contentId);
    if (!content) {
      res.status(404).send({ message: 'Content not found' });
    } else {
    res.status(200).send({
        message:"data find successful",
        contents:content
    })
    }
  }  catch (error) {
    res.status(500).send({
        message:"Something went wrong",
    error: error.message
    });
  }
};

// Update content details
exports.updateContent = async (req, res) => {
  try {

    const contentId = req.params.id;
    const { title, description, category, vendor, price, isFree } = req.body;
    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      {
        title,
        description,
        category,
        vendor,
        price,
        isFree,
      },
      { new: true }
    );
    if (!updatedContent) {
      res.status(404).send({ message: 'Content not found' });
    } else {
      res.status(200).send({
        message:"Update content successful",
        content:updatedContent
      })
    }
  }  catch (error) {
    res.status(500).send({
        message:"Something went wrong",
    error: error.message
    });
  }
};

// Delete a content
exports.deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const deletedContent = await Content.findByIdAndRemove(contentId);
    if (!deletedContent) {
      res.status(404).send({ message: 'Content not found' });
    } else {
      res.status(200).send({ message: 'Content deleted successfully' });
    }
  }  catch (error) {
    res.status(500).send({
        message:"Something went wrong",
    error: error.message
    });
  }
};

// Rate an image (thumbs up/thumbs down)
exports.rateImage = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { rating } = req.body;
    const content = await Content.findById(contentId);
    if (!content) {
      res.status(404).send({ message: 'Content not found' });
    } else {
      // Update the rating
      content.rating = rating;
      await content.save();
      res.status(200).send(content);
    }
  } catch (error) {
    res.status(500).send({ 
      message:"Something went wrong",
      error: error.message
     });
  }
};

// Mark an image as favorite
exports.markAsFavorite = async (req, res) => {
  try {
    const contentId = req.params.id;
    const userId = req.username.id; // Assuming you have implemented authentication middleware
    const content = await Content.findById(contentId);
    if (!content) {
      res.status(404).send({ message: 'Content not found' });
    } else {
      // Check if the user has already marked the content as favorite
      const isFavorite = content.favorites.includes(userId);
      if (isFavorite) {
        res.status(409).send({ message: 'Content is already marked as favorite' });
      } else {
        // Add the user to the favorites list
        content.favorites.push(userId);
        await content.save();
        res.status(200).send(content);
      }
    }
  } catch (error) {
    res.status(500).send({ 
      message:"Something went wrong",
      error: error.message
     });
  }
};