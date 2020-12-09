CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
product_name VARCHAR(100),
product_price INTEGER,
product_color VARCHAR(100),
product_size VARCHAR(100)
);

INSERT INTO products
(product_name, product_price, product_color, product_size)
VALUES
($1, $2, $3, $4);

INSERT INTO products
(product_name, product_price, product_color, product_size)
VALUES
('iPad Air', 749, 'Space Gray', '256GB'),
('iPad Air', 599, 'Space Gray', '64GB'),
('iPad Air', 749, 'Rose Gold', '256GB'),
('iPad Air', 599, 'Rose Gold', '64GB'),
('iPad Air', 749, 'Sky Blue', '256GB'),
('iPad Air', 599, 'Sky Blue', '64GB'),
('iPad Air', 749, 'Green', '256GB'),
('iPad Air', 599, 'Green', '64GB'),
('MacBook Air', 999, 'Space Gray', '256GB'),
('MacBook Air', 999, 'Gold', '256GB'),
('MacBook Air', 999, 'Silver', '256GB'),
('MacBook Air', 1249, 'Space Gray', '512GB'),
('MacBook Air', 1249, 'Gold', '512GB'),
('MacBook Air', 1249, 'Silver', '512GB');

ALTER TABLE products
ADD img varchar(2000)

UPDATE products
SET img =''
WHERE product_id = 1