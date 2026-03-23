let products = [
  {
    id: 1,
    name: 'Laptop Asus VivoBook 15',
    category: 'Student',
    price: 7500000,
    stock: 15,
    description: 'Lightweight laptop for students and professionals',
  },
  {
    id: 2,
    name: 'Laptop Dell XPS 13',
    category: 'Premium',
    price: 18500000,
    stock: 8,
    description: 'Slim premium laptop with 13.4-inch InfinityEdge display',
  },
  {
    id: 3,
    name: 'Laptop Lenovo ThinkPad E14',
    category: 'Business',
    price: 12000000,
    stock: 20,
    description: 'Durable business laptop with comfortable keyboard and long battery life',
  },
  {
    id: 4,
    name: 'Laptop Acer Nitro 5',
    category: 'Gaming',
    price: 11000000,
    stock: 12,
    description: 'Gaming laptop with NVIDIA RTX 3050 GPU and 144Hz adaptive display',
  },
  {
    id: 5,
    name: 'MacBook Air M2',
    category: 'Premium',
    price: 16999000,
    stock: 10,
    description: 'Apple laptop with M2 chip, fanless slim design, and up to 18-hour battery life',
  },
];

let nextId = 6;

module.exports = {
  getAll: () => products,
  getById: (id) => products.find((p) => p.id === id),
  create: (data) => {
    const now = new Date().toISOString();
    const product = {
      id: nextId++,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    products.push(product);
    return product;
  },
  update: (id, data) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = {
      ...products[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };
    return products[index];
  },
  remove: (id) => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },
};
