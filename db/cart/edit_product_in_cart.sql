UPDATE cart
SET quantity = $3
WHERE user_id = $1 
AND product_id = $2;

SELECT * FROM cart ORDER BY user_id;