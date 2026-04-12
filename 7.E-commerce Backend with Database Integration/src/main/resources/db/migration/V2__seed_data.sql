INSERT INTO users (email, password, first_name, last_name, role, is_active, created_at, updated_at)
VALUES 
('john.doe@example.com', 'password123', 'John', 'Doe', 'USER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin@example.com', 'admin123', 'Admin', 'User', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

INSERT INTO categories (name, description, created_at, updated_at)
VALUES 
('Electronics', 'Gadgets and devices', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Accessories', 'Cables and more', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (name, description, price, stock, category_id, is_active, created_at, updated_at)
VALUES 
('Wireless Headphones', 'Noise cancelling', 99.99, 100, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('USB-C Cable', 'Fast charging cable', 19.99, 50, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
