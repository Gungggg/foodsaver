/**
 * @fileoverview Database seeder – creates admin, merchants, products, orders, and impact data.
 */
'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = await bcrypt.hash('password123', 12);

    // ===================== 1. USERS =====================
    await queryInterface.bulkInsert('users', [
      // Admin
      { id: 1, name: 'Admin FoodSaver', email: 'admin@foodsaver.id', phone: '081200000000', password_hash: passwordHash, role: 'admin', created_at: now, updated_at: now },
      // Merchants
      { id: 2, name: 'Budi Santoso', email: 'budi@bakeryku.id', phone: '081200000001', password_hash: passwordHash, role: 'merchant', created_at: now, updated_at: now },
      { id: 3, name: 'Siti Rahayu', email: 'siti@dapursiti.id', phone: '081200000002', password_hash: passwordHash, role: 'merchant', created_at: now, updated_at: now },
      { id: 4, name: 'Ahmad Wijaya', email: 'ahmad@freshmart.id', phone: '081200000003', password_hash: passwordHash, role: 'merchant', created_at: now, updated_at: now },
      // Customers
      { id: 5, name: 'Dewi Lestari', email: 'dewi@email.com', phone: '081200000004', password_hash: passwordHash, role: 'customer', created_at: now, updated_at: now },
      { id: 6, name: 'Rizky Pratama', email: 'rizky@email.com', phone: '081200000005', password_hash: passwordHash, role: 'customer', created_at: now, updated_at: now },
    ]);

    // ===================== 2. MERCHANTS =====================
    await queryInterface.bulkInsert('merchants', [
      {
        id: 1,
        user_id: 2,
        store_name: 'Bakery Ku',
        description: 'Toko roti dan kue tradisional sejak 2010. Menyediakan berbagai roti segar setiap hari.',
        address: 'Jl. Sudirman No. 45',
        city: 'Jakarta',
        phone: '081200000001',
        operating_hours: JSON.stringify({ mon: '07:00-21:00', tue: '07:00-21:00', wed: '07:00-21:00', thu: '07:00-21:00', fri: '07:00-21:00', sat: '08:00-20:00', sun: '08:00-18:00' }),
        category: 'bakery',
        status: 'approved',
        verified_at: now,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        user_id: 3,
        store_name: 'Dapur Siti',
        description: 'Masakan rumahan khas Jawa. Nasi box dan catering dengan bahan berkualitas.',
        address: 'Jl. Gatot Subroto No. 12',
        city: 'Bandung',
        phone: '081200000002',
        operating_hours: JSON.stringify({ mon: '10:00-20:00', tue: '10:00-20:00', wed: '10:00-20:00', thu: '10:00-20:00', fri: '10:00-20:00', sat: '10:00-18:00', sun: 'closed' }),
        category: 'restaurant',
        status: 'approved',
        verified_at: now,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        user_id: 4,
        store_name: 'FreshMart',
        description: 'Supermarket mini yang menjual buah, sayur, dan dairy segar setiap hari.',
        address: 'Jl. Diponegoro No. 78',
        city: 'Surabaya',
        phone: '081200000003',
        operating_hours: JSON.stringify({ mon: '08:00-22:00', tue: '08:00-22:00', wed: '08:00-22:00', thu: '08:00-22:00', fri: '08:00-22:00', sat: '08:00-22:00', sun: '09:00-20:00' }),
        category: 'grocery',
        status: 'approved',
        verified_at: now,
        created_at: now,
        updated_at: now,
      },
    ]);

    // ===================== 3. PRODUCTS (10 items) =====================
    await queryInterface.bulkInsert('products', [
      { id: 1, merchant_id: 1, title: 'Surprise Bread Bag', description: 'Assorted fresh bread from today – may include sourdough, ciabatta, and baguette.', category: 'bread_bakery', original_price: 75000, discounted_price: 25000, daily_stock: 15, current_stock: 10, pickup_start: '17:00', pickup_end: '19:00', estimated_weight_kg: 0.80, is_active: true, created_at: now, updated_at: now },
      { id: 2, merchant_id: 1, title: 'Pastry Mix Box', description: 'Selection of croissants, danishes, and muffins baked fresh today.', category: 'pastry_snacks', original_price: 60000, discounted_price: 20000, daily_stock: 10, current_stock: 8, pickup_start: '16:00', pickup_end: '18:30', estimated_weight_kg: 0.60, is_active: true, created_at: now, updated_at: now },
      { id: 3, merchant_id: 1, title: 'Cake Slice Bundle', description: '3 slices of assorted cakes – chocolate, cheese, and fruit cake.', category: 'pastry_snacks', original_price: 90000, discounted_price: 35000, daily_stock: 8, current_stock: 5, pickup_start: '17:00', pickup_end: '20:00', estimated_weight_kg: 0.50, is_active: true, created_at: now, updated_at: now },
      { id: 4, merchant_id: 2, title: 'Nasi Box Surprise', description: 'Nasi box with lauk pauk – could be ayam, ikan, or tempe with sambal.', category: 'prepared_meals', original_price: 35000, discounted_price: 15000, daily_stock: 20, current_stock: 12, pickup_start: '13:00', pickup_end: '15:00', estimated_weight_kg: 0.60, is_active: true, created_at: now, updated_at: now },
      { id: 5, merchant_id: 2, title: 'Meal Prep Pack', description: 'Balanced meal prep with protein, carbs, and veggies. Great for lunch!', category: 'prepared_meals', original_price: 50000, discounted_price: 20000, daily_stock: 12, current_stock: 7, pickup_start: '11:00', pickup_end: '14:00', estimated_weight_kg: 0.70, is_active: true, created_at: now, updated_at: now },
      { id: 6, merchant_id: 2, title: 'Snack Attack Box', description: 'Mix of Indonesian snacks: risoles, pastel, lemper, and more.', category: 'pastry_snacks', original_price: 45000, discounted_price: 18000, daily_stock: 15, current_stock: 9, pickup_start: '14:00', pickup_end: '17:00', estimated_weight_kg: 0.50, is_active: true, created_at: now, updated_at: now },
      { id: 7, merchant_id: 3, title: 'Fresh Fruit Bag', description: 'Seasonal fruits – slightly imperfect but perfectly delicious.', category: 'fruits_vegetables', original_price: 55000, discounted_price: 20000, daily_stock: 10, current_stock: 6, pickup_start: '16:00', pickup_end: '19:00', estimated_weight_kg: 1.20, is_active: true, created_at: now, updated_at: now },
      { id: 8, merchant_id: 3, title: 'Veggie Rescue Box', description: 'Assorted vegetables approaching best-before date but still fresh.', category: 'fruits_vegetables', original_price: 40000, discounted_price: 15000, daily_stock: 12, current_stock: 8, pickup_start: '18:00', pickup_end: '21:00', estimated_weight_kg: 1.50, is_active: true, created_at: now, updated_at: now },
      { id: 9, merchant_id: 3, title: 'Dairy Surprise Pack', description: 'Yogurt, cheese, and milk nearing expiry but still safe to consume.', category: 'dairy', original_price: 65000, discounted_price: 25000, daily_stock: 8, current_stock: 4, pickup_start: '17:00', pickup_end: '20:00', estimated_weight_kg: 0.80, is_active: true, created_at: now, updated_at: now },
      { id: 10, merchant_id: 3, title: 'Mixed Grocery Bag', description: 'A surprise mix of bakery, snacks, and fresh produce items.', category: 'mixed', original_price: 80000, discounted_price: 30000, daily_stock: 6, current_stock: 3, pickup_start: '18:00', pickup_end: '21:00', estimated_weight_kg: 1.00, is_active: true, created_at: now, updated_at: now },
    ]);

    // ===================== 4. SAMPLE ORDERS =====================
    const qr1 = uuidv4();
    const qr2 = uuidv4();
    const qr3 = uuidv4();

    await queryInterface.bulkInsert('orders', [
      { id: 1, order_number: 'FS-SEED-001', customer_id: 5, product_id: 1, merchant_id: 1, quantity: 2, total_amount: 50000, status: 'picked_up', qr_token: qr1, pickup_deadline: new Date(now.getTime() + 86400000), picked_up_at: now, created_at: now, updated_at: now },
      { id: 2, order_number: 'FS-SEED-002', customer_id: 5, product_id: 4, merchant_id: 2, quantity: 1, total_amount: 15000, status: 'confirmed', qr_token: qr2, pickup_deadline: new Date(now.getTime() + 86400000), picked_up_at: null, created_at: now, updated_at: now },
      { id: 3, order_number: 'FS-SEED-003', customer_id: 6, product_id: 7, merchant_id: 3, quantity: 1, total_amount: 20000, status: 'picked_up', qr_token: qr3, pickup_deadline: new Date(now.getTime() + 86400000), picked_up_at: now, created_at: now, updated_at: now },
    ]);

    // ===================== 5. PAYMENTS =====================
    await queryInterface.bulkInsert('payments', [
      { id: 1, order_id: 1, gateway_ref: 'SNAP-FS-SEED-001', payment_method: 'bank_transfer', amount: 50000, status: 'success', paid_at: now, created_at: now, updated_at: now },
      { id: 2, order_id: 2, gateway_ref: 'SNAP-FS-SEED-002', payment_method: 'gopay', amount: 15000, status: 'success', paid_at: now, created_at: now, updated_at: now },
      { id: 3, order_id: 3, gateway_ref: 'SNAP-FS-SEED-003', payment_method: 'bank_transfer', amount: 20000, status: 'success', paid_at: now, created_at: now, updated_at: now },
    ]);

    // ===================== 6. RECEIPTS =====================
    await queryInterface.bulkInsert('receipts', [
      { id: 1, order_id: 1, receipt_number: 'RCP-FS-SEED-001', receipt_data: JSON.stringify({ order_number: 'FS-SEED-001', product_title: 'Surprise Bread Bag', quantity: 2, total_amount: 50000 }), qr_code_url: null, created_at: now },
      { id: 2, order_id: 2, receipt_number: 'RCP-FS-SEED-002', receipt_data: JSON.stringify({ order_number: 'FS-SEED-002', product_title: 'Nasi Box Surprise', quantity: 1, total_amount: 15000 }), qr_code_url: null, created_at: now },
      { id: 3, order_id: 3, receipt_number: 'RCP-FS-SEED-003', receipt_data: JSON.stringify({ order_number: 'FS-SEED-003', product_title: 'Fresh Fruit Bag', quantity: 1, total_amount: 20000 }), qr_code_url: null, created_at: now },
    ]);

    // ===================== 7. IMPACT LOGS =====================
    await queryInterface.bulkInsert('impact_logs', [
      { id: 1, order_id: 1, customer_id: 5, merchant_id: 1, food_saved_kg: 1.60, co2_saved_kg: 2.08, money_saved: 100000, created_at: now },
      { id: 2, order_id: 3, customer_id: 6, merchant_id: 3, food_saved_kg: 1.20, co2_saved_kg: 0.96, money_saved: 35000, created_at: now },
    ]);

    // ===================== 8. SAMPLE COMPLAINT =====================
    await queryInterface.bulkInsert('complaints', [
      { id: 1, user_id: 5, order_id: null, subject: 'App bug on checkout', description: 'I encountered an error when trying to complete my checkout. The page froze after clicking the pay button.', status: 'open', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('complaints', null, {});
    await queryInterface.bulkDelete('impact_logs', null, {});
    await queryInterface.bulkDelete('receipts', null, {});
    await queryInterface.bulkDelete('payments', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('documents', null, {});
    await queryInterface.bulkDelete('merchants', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
