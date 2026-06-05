-- Query 1: Insert Johannes Vermeer into the artist table
USE art;
INSERT INTO artist (first_name, last_name, birth_year, death_year, country, location)
VALUES ('Johannes', 'Vermeer', 1632, 1674, 'Netherlands', 'Netherlands');

-- Query 2: List all artist records sorted alphabetically by last name
SELECT * FROM artist
ORDER BY last_name;

-- Query 3: Update Johannes Vermeer's death year to 1675
UPDATE artist
SET death_year = 1675
WHERE last_name = 'Vermeer';

-- Query 4: Delete Johannes Vermeer from the artist table
DELETE FROM artist
WHERE last_name = 'Vermeer';

-- Query 5: List first name, last name, and phone of customers from Houston, Texas
USE bike;
SELECT first_name, last_name, phone
FROM customers
WHERE city = 'Houston';

-- Query 6: List high-end bikes with a $500 discount, sorted by list price descending
USE bike;
SELECT product_name, list_price, list_price - 500 AS `Discount Price`
FROM products
WHERE list_price >= 5000
ORDER BY list_price DESC;

-- Query 7: List all staff and their email who are not from store 1
USE bike;
SELECT first_name, last_name, email
FROM staff
WHERE store_id <> 1;

-- Query 8: List name, model year, and list price of bikes with 'spider' in the name
USE bike;
SELECT product_name, model_year, list_price
FROM products
WHERE product_name LIKE '%spider%';

-- Query 9: List all bike names with prices from $500 to $550, sorted by lowest price first
USE bike;
SELECT product_name, list_price
FROM products
WHERE list_price BETWEEN 500 AND 550
ORDER BY list_price;

-- Query 10: Show customer details for those with a phone number OR city containing 'ach'/'och' OR last name William
USE bike;
SELECT first_name, last_name, phone, street, city, state, zip_code
FROM customers
WHERE phone IS NOT NULL
   OR city LIKE '%ach%' OR city LIKE '%och%'
   OR last_name = 'William'
LIMIT 5;

-- Query 11: List Surly or Trek products with brand name removed, ordered by product_id
USE bike;
SELECT
  TRIM(SUBSTRING(product_name, LOCATE(' ', product_name) + 1)) AS Model
FROM products
WHERE product_name LIKE 'Surly %' OR product_name LIKE 'Trek %'
ORDER BY product_id
LIMIT 10;

-- Query 12: Display 2025 model year bikes with price divided into 3 equal payments
USE bike;
SELECT
  product_name,
  CONCAT('$', FORMAT(list_price / 3, 2)) AS `One of 3 payments`
FROM products
WHERE model_year = 2025;

-- Query 13: Magazine name with 3% off the price, rounded to 2 decimal places
USE magazine;
SELECT
  magazineName,
  ROUND(price * 0.97, 2) AS `3% off`
FROM magazines;

-- Query 14: Years since subscription started, rounded to nearest year, using 2020-12-20 as reference date
USE magazine;
SELECT
  subscriberKey,
  ROUND(DATEDIFF('2020-12-20', subscriptionStartDate) / 365) AS `Years since subscription`
FROM subscriptions;

-- Query 15: Subscription start date, length, and calculated end date formatted
USE magazine;
SELECT
  subscriptionStartDate,
  subscriptionLength,
  DATE_FORMAT(DATE_ADD(subscriptionStartDate, INTERVAL subscriptionLength MONTH), '%M %e, %Y') AS `subscription end`
FROM subscriptions;