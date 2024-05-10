import mysql.connector
from mysql.connector import Error
from faker import Faker
from datetime import datetime, timedelta
import random

# Function to generate random data for customers
def generate_customer_data(num_records):
    fake = Faker()
    data = []
    for _ in range(num_records):
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = fake.email()
        data.append((first_name, last_name, email))
    return data

# Function to generate random data for restaurants
def generate_restaurant_data(num_records):
    fake = Faker()
    data = []
    for _ in range(num_records):
        name = fake.company()
        location = fake.address()
        cuisine = random.choice(["Italian", "Mexican", "Japanese", "Indian", "Chinese"])
        data.append((name, location, cuisine))
    return data

# Function to populate Customers table
def populate_customers(cursor, num_records):
    data = generate_customer_data(num_records)
    for item in data:
        cursor.execute("INSERT INTO Customers (FirstName, LastName, Email) VALUES (%s, %s, %s)", item)

# Function to populate Restaurants table
def populate_restaurants(cursor, num_records):
    data = generate_restaurant_data(num_records)
    for item in data:
        cursor.execute("INSERT INTO Restaurants (Name, Location, Cuisine) VALUES (%s, %s, %s)", item)

# Function to populate Orders table
def populate_orders(cursor, num_orders, num_customers, num_restaurants):
    for _ in range(num_orders):
        order_date = datetime.now() - timedelta(days=random.randint(1, 365))
        total_amount = round(random.uniform(10, 1000), 2)
        customer_id = random.randint(1, num_customers)
        restaurant_id = random.randint(1, num_restaurants)
        cursor.execute("INSERT INTO Orders (CustomerID, RestaurantID, OrderDate, TotalAmount) VALUES (%s, %s, %s, %s)", (customer_id, restaurant_id, order_date, total_amount))

# Connect to MySQL
try:
    connection = mysql.connector.connect(host='your_host',
                                         database='your_database',
                                         user='your_user',
                                         password='your_password')

    if connection.is_connected():
        cursor = connection.cursor()

        # Populate Customers table with 100 records
        populate_customers(cursor, 100)

        # Populate Restaurants table with 20 records
        populate_restaurants(cursor, 20)

        # Populate Orders table with 500 records
        populate_orders(cursor, 500, 100, 20)

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
