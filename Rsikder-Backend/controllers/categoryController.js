import Category from "../models/categoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
  const { name, description, status, subCategories } = req.body;
  try {
    const category = new Category({ name, description, status, subCategories });
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listCategories = async (req, res) => {
  try {
    // console.log("listCategories");

    const categories = await Category.find().populate("subCategories");

    // console.log("categories", categories);

    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("subCategories");

    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  const { name, description, status, subCategories } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, status, subCategories },
      { new: true }
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a subcategory to an existing category
export const addSubCategory = async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.subCategories.push({ name, description, status });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubCategory = async (req, res) => {
  const { id, subCategoryId } = req.params; // Get category ID and subcategory ID
  const { name, description, status } = req.body; // Fields to update

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the subcategory by its ID
    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Update subcategory fields
    if (name) subCategory.name = name;
    if (description) subCategory.description = description;
    if (status) subCategory.status = status;

    // Save the updated category
    await category.save();

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating subcategory",
      error: error.message,
    });
  }
};
