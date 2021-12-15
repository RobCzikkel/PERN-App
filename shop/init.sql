-- to deploy on Heroku we use the following commands
-- cat init.sql | heroku pg:psql -a name-of-the-app

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(10) UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(100),
    price FLOAT,
    category VARCHAR(20),
    photo VARCHAR(20) UNIQUE
);

CREATE TABLE cart ( 
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);   

CREATE TABLE cart_item (
    id SERIAL PRIMARY KEY,
    quantity INT DEFAULT 1,
    cart_id INT REFERENCES cart(id)  ON DELETE CASCADE NOT NULL,
    prod_id INT REFERENCES products(id)  ON DELETE CASCADE NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total DECIMAL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_item (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    prod_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    price FLOAT NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(username, email, password) VALUES('Luu Bega', 'luu@bega.com', 'asdf1234');
INSERT INTO products(name, description) VALUES('jordans', 'latest pair of jordans');
INSERT INTO cart(user_id) VALUES(1);
INSERT INTO cart_item(quantity, cart_id, prod_id) VALUES(2, 1, 1);
INSERT INTO order_detail(user_id, total) VALUES(1, 200);
INSERT INTO order_item(order_id, prod_id, quantity, price) VALUES(1,1,2,200);