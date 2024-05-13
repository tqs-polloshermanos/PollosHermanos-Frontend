import mysql.connector
from mysql.connector import Error
from faker import Faker
from datetime import datetime, timedelta
import random

# Function to generate random data for users
def generate_users_data(num_records):
    fake = Faker()
    data = []
    for _ in range(num_records):
        email = fake.email()
        password = fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True)
        role_type = random.choice(["Admin", "Customer", "Employee"])
        data.append((email, password, role_type))
    return data

# Function to generate random data for products
def generate_products_data(num_records):
    fake = Faker()
    data = []
    for _ in range(num_records):
        name = fake.word()
        cuisine = random.choice(["Italian", "Mexican", "Japanese", "Indian", "Chinese", "French", "Greek", "Spanish", "American"])
        restaurant_id = random.randint(1, num_records)
        description = fake.text()
        price = round(random.uniform(1, 100), 2)
        data.append((name, cuisine, restaurant_id, description, price))
    return data

# Function to generate random data for ingredients
def generate_ingredients_data(num_records):
    fake = Faker()
    data = []
    for _ in range(num_records):
        name = fake.word()
        description = fake.text()
        data.append((name, description))
    return data

# Function to generate random data for product ingredients
def generate_product_ingredients_data(num_records, num_products, num_ingredients):
    data = []
    for _ in range(num_records):
        ingredient_id = random.randint(1, num_ingredients)
        product_id = random.randint(1, num_products)
        quantity = random.randint(1, 10)
        data.append((ingredient_id, product_id, quantity))
    return data

# Function to generate random data for restaurants
def generate_restaurants_data(num_records):
    fake = Faker()
    data = []
    for _ in range(num_records):
        name = fake.company()
        address = fake.address()
        cuisine = random.choice(["Italian", "Mexican", "Japanese", "Indian", "Chinese", "French", "Greek", "Spanish", "American"])
        description = fake.text()
        data.append((name, address, cuisine, description))
    return data

# Function to generate random data for payments
def generate_payments_data(num_records, num_orders):
    fake = Faker()
    data = []
    for _ in range(num_records):
        order_id = random.randint(1, num_orders)
        date = datetime.now()
        amount = "SELECT TotalAmount FROM Orders WHERE OrderID = order_id"
        card_number = fake.credit_card_number()
        card_holder = fake.name()
        expiry_date = fake.date_this_century()
        cvv = fake.credit_card_security_code()
        data.append((order_id, date, amount, card_number, card_holder, expiry_date, cvv))
    return data

# Function to populate Users table
def populate_users(cursor, num_records):
    data = generate_users_data(num_records)
    for item in data:
        cursor.execute("INSERT INTO Users (Email, Password, RoleType) VALUES (%s, %s, %s)", item)

# Function to populate Products table
def populate_products(cursor, num_records):
    data = generate_products_data(num_records)
    for item in data:
        cursor.execute("INSERT INTO Products (ProductName, CuisineType, RestaurantID, Description, Price) VALUES (%s, %s, %s, %s, %s)", item)

# Function to populate Ingredients table
def populate_ingredients(cursor, num_records):
    data = generate_ingredients_data(num_records)
    for item in data:
        cursor.execute("INSERT INTO Ingredients (IngredientName, Description) VALUES (%s, %s, %s)", item)

# Function to populate ProductIngredients table
def populate_product_ingredients(cursor, num_records, num_products, num_ingredients):
    data = generate_product_ingredients_data(num_records, num_products, num_ingredients)
    for item in data:
        cursor.execute("INSERT INTO ProductIngredients (IngredientID, ProductID, Quantity) VALUES (%s, %s, %s)", item)

# Function to populate Restaurants table
def populate_restaurants(cursor, num_records):
    data = generate_restaurants_data(num_records)
    for item in data:
        cursor.execute("INSERT INTO Restaurants (RestaurantName, Address, CuisineType, Description) VALUES (%s, %s, %s, %s)", item)

# Function to populate Orders table
def populate_orders(cursor, num_orders, num_customers, num_restaurants):
    for _ in range(num_orders):
        order_date = datetime.now() - timedelta(days=random.randint(1, 365))
        total_amount = round(random.uniform(10, 1000), 2)
        customer_id = random.randint(1, num_customers)
        restaurant_id = random.randint(1, num_restaurants)
        cursor.execute("INSERT INTO Orders (CustomerID, RestaurantID, OrderDate, TotalAmount) VALUES (%s, %s, %s, %s)", (customer_id, restaurant_id, order_date, total_amount))

# Function to populate OrderDetails table
def populate_order_details(cursor, num_records, num_orders, num_products):
    for _ in range(num_records):
        order_id = random.randint(1, num_orders)
        product_id = random.randint(1, num_products)
        quantity = random.randint(1, 10)
        price = cursor.execute("SELECT Price FROM Products WHERE ProductID = %s", (product_id))
        total_price = price * quantity
        cursor.execute("INSERT INTO OrderDetails (OrderID, ProductID, Quantity, TotalAmount) VALUES (%s, %s, %s, %s)", (order_id, product_id, quantity, total_price))

# Function to populate OrderStatus table
def populate_order_status(cursor, num_records, num_orders):
    for _ in range(num_records):
        order_id = random.randint(1, num_orders)
        status = random.choice(["Pending", "Processing", "Delivered", "Cancelled"])
        status_date = datetime.now()
        cursor.execute("INSERT INTO OrderStatus (OrderID, Status, StatusDate) VALUES (%s, %s, %s)", (order_id, status, status_date))

# Function to populate Payments table
def populate_payments(cursor, num_records, num_orders):
    data = generate_payments_data(num_records, num_orders)
    for item in data:
        cursor.execute("INSERT INTO Payments (OrderID, PaymentDate, PaymentAmount, CardNumber, CardHolderName, ExpiryDate, CVV) VALUES (%s, %s, %s, %s, %s, %s, %s)", item)


# Connect to MySQL
try:
    connection = mysql.connector.connect(host='your_host',
                                         database='your_database',
                                         user='your_user',
                                         password='your_password')

    if connection.is_connected():
        cursor = connection.cursor()

        # Populate Customers table with 100 records
        populate_users(cursor, 100)

        # Populate Products table with 50 records
        populate_products(cursor, 50)

        # Populate Ingredients table with 100 records
        populate_ingredients(cursor, 100)

        # Populate ProductIngredients table with 200 records
        populate_product_ingredients(cursor, 200, 50, 100)

        # Populate Restaurants table with 20 records
        populate_restaurants(cursor, 20)

        # Populate Orders table with 500 records
        populate_orders(cursor, 500, 100, 20)

        # Populate OrderDetails table with 1000 records
        populate_order_details(cursor, 1000, 500, 50)

        # Populate OrderStatus table with 500 records
        populate_order_status(cursor, 500, 500)

        # Populate Payments table with 500 records
        populate_payments(cursor, 500, 500)

        # Commit changes
        connection.commit()
        print("Data inserted successfully!")

except Error as e:
    print("Error while connecting to MySQL", e)

finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
