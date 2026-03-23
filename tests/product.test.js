const request = require('supertest');
const app = require('../src/app');

describe('Product API - CRUD Tests', () => {
  let createdProductId;

  // GET /api/products
  describe('GET /api/products', () => {
    test('should return all products with success response', async () => {
      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty('count');
    });

    test('should filter products by category', async () => {
      const res = await request(app).get('/api/products?category=Elektronik');

      expect(res.statusCode).toBe(200);
      res.body.data.forEach((p) => {
        expect(p.category.toLowerCase()).toBe('elektronik');
      });
    });

    test('should search products by name', async () => {
      const res = await request(app).get('/api/products?search=Laptop');

      expect(res.statusCode).toBe(200);
      res.body.data.forEach((p) => {
        expect(p.name.toLowerCase()).toContain('laptop');
      });
    });
  });

  // GET /api/products/:id
  describe('GET /api/products/:id', () => {
    test('should return a product by id', async () => {
      const res = await request(app).get('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    test('should return 404 for non-existent product', async () => {
      const res = await request(app).get('/api/products/9999');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // POST /api/products
  describe('POST /api/products', () => {
    test('should create a new product', async () => {
      const newProduct = {
        name: 'Headphone Sony WH-1000XM5',
        category: 'Elektronik',
        price: 4500000,
        stock: 20,
        description: 'Headphone noise-cancelling premium',
      };

      const res = await request(app).post('/api/products').send(newProduct);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(newProduct.name);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('createdAt');

      createdProductId = res.body.data.id;
    });

    test('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/api/products').send({ name: 'Produk Tanpa Harga' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('errors');
    });

    test('should return 400 if price is negative', async () => {
      const res = await request(app).post('/api/products').send({
        name: 'Produk Invalid',
        category: 'Tes',
        price: -100,
        stock: 10,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // PUT /api/products/:id
  describe('PUT /api/products/:id', () => {
    test('should update an existing product', async () => {
      const res = await request(app)
        .put(`/api/products/${createdProductId}`)
        .send({ price: 4000000, stock: 25 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(4000000);
      expect(res.body.data.stock).toBe(25);
    });

    test('should return 404 when updating non-existent product', async () => {
      const res = await request(app).put('/api/products/9999').send({ price: 100000 });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // DELETE /api/products/:id
  describe('DELETE /api/products/:id', () => {
    test('should delete an existing product', async () => {
      const res = await request(app).delete(`/api/products/${createdProductId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('should return 404 when deleting non-existent product', async () => {
      const res = await request(app).delete('/api/products/9999');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // Health Check
  describe('GET /health', () => {
    test('should return health status', async () => {
      const res = await request(app).get('/health');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
