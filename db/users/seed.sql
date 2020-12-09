CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
country VARCHAR(100),
birthday date, 
email VARCHAR(100),
password VARCHAR(100),
phone_number INTEGER
);

INSERT INTO users
(first_name, last_name, country, birthday, email, password, phone_number)
VALUES
('Janie', 'Kim', 'USA', 0116, 'janiekim@email.com', 'password', 2545552020);