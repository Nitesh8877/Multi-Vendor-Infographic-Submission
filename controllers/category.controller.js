
const Category = require('../models/category.model');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).send({
        message:"Successful create new category",
        category:category
    });
  } catch (error) {
    res.status(500).send({
         message:"Something went wrong",
    error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.statu(200).send({
        message:"successful get all cateory data",
        data:categories});
  }catch (error) {
    res.status(500).send({
         message:"Something went wrong",
    error: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).send({ message: 'Category not found' });
    } else {
      res.status(200).send({category:category});
    }
  } catch (error) {
    res.status(500).send({
         message:"Something went wrong",
    error: error.message });
  }
};

// Update category details
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      res.status(404).send({ message: 'Category not found' });
    } else {
      res.status(200).send({
        message:"Update category name successful",
        categoryName:updatedCategory
      });
    }
  } catch (error) {
    res.status(500).send({
         message:"Something went wrong",
    error: error.message
 });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndRemove(categoryId);
    if (!deletedCategory) {
      res.status(404).send({ message: 'Category not found' });
    } else {
      res.status(200).send({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    res.status(500).send({
         message:"Something went wrong",
    error: error.message });
  }
};
