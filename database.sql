CREATE DATABASE users;

CREATE TABLE  users(
 user_id SERIAL PRIMARY KEY,
 first_name VARCHAR(255),
 last_name VARCHAR(255),
 email VARCHAR(255)
);

CREATE TABLE posts(
 post_id SERIAL PRIMARY KEY,
 title VARCHAR(255),
 author VARCHAR(255),
 date VARCHAR(255),
 content VARCHAR(255),
);


