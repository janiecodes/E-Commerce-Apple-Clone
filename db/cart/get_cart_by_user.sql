SELECT c.*, p.*
FROM cart c
JOIN products p 
ON p.product_id = c.product_id
JOIN users u
ON c.user_id = u.user_id
WHERE u.user_id = $1;