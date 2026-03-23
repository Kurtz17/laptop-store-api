const store = require('../data/productStore');

// GET /api/products
const getAllProducts = (req, res) => {
  const { category, search } = req.query;
  let products = store.getAll();

  if (category) {
    products = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return res.status(200).json({
    success: true,
    message: 'Successfully retrieved all products',
    count: products.length,
    data: products,
  });
};

// GET /api/products/:id
const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = store.getById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
      data: null,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Successfully retrieved product',
    data: product,
  });
};

// POST /api/products
const createProduct = (req, res) => {
  const { name, category, price, stock, description } = req.body;

  // Validation
  const errors = [];
  if (!name || name.trim() === '') errors.push('name is required');
  if (!category || category.trim() === '') errors.push('category is required');
  if (price === undefined || price === null) errors.push('price is required');
  if (typeof price !== 'number' || price < 0) errors.push('price must be a positive number');
  if (stock === undefined || stock === null) errors.push('stock is required');
  if (typeof stock !== 'number' || stock < 0) errors.push('stock must be a positive number');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const product = store.create({ name, category, price, stock, description: description || '' });

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
};

// PUT /api/products/:id
const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, price, stock, description } = req.body;

  const existing = store.getById(id);
  if (!existing) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
      data: null,
    });
  }

  // Validation if fields are provided
  const errors = [];
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    errors.push('price must be a positive number');
  }
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    errors.push('stock must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  const updated = store.update(id, { name, category, price, stock, description });

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updated,
  });
};

// DELETE /api/products/:id
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = store.remove(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: `Product with id ${id} not found`,
      data: null,
    });
  }

  return res.status(200).json({
    success: true,
    message: `Product with id ${id} deleted successfully`,
    data: null,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
