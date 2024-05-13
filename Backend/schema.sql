-- Create tables
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Role ENUM('Admin', 'Customer') NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    CuisineType VARCHAR(100) NOT NULL,
    RestaurantID INT,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
    CHECK (CuisineType IN ("Italian", "Mexican", "Japanese", "Indian", "Chinese", "French", "Greek", "Spanish", "American"))
);

CREATE TABLE IF NOT EXISTS Ingredients (
    IngredientID INT PRIMARY KEY AUTO_INCREMENT,
    IngredientName VARCHAR(100) NOT NULL,
    Description TEXT
);

CREATE TABLE IF NOT EXISTS ProductIngredients (
    IngredientID INT,
    ProductID INT,
    Quantity DECIMAL(10, 2),
    PRIMARY KEY (IngredientID, ProductID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);

CREATE TABLE IF NOT EXISTS Restaurants (
    RestaurantID INT PRIMARY KEY AUTO_INCREMENT,
    RestaurantName VARCHAR(100) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    CuisineType VARCHAR(100) NOT NULL,
    Description TEXT
    CHECK (CuisineType IN ("Italian", "Mexican", "Japanese", "Indian", "Chinese", "French", "Greek", "Spanish", "American"))
);

CREATE TABLE IF NOT EXISTS Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    RestaurantID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
    FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
);

CREATE TABLE IF NOT EXISTS OrderDetails (
    OrderDetailID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE IF NOT EXISTS OrderStatus (
    StatusID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    Status VARCHAR(100),
    StatusDate DATETIME,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    CHECK (Status IN ('Pending', 'Processing', 'Done', 'Delivered', 'Cancelled'))
);

CREATE TABLE IF NOT EXISTS Payments (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    PaymentDate DATE,
    PaymentAmount DECIMAL(10, 2),
    CardNumber VARCHAR(16),
    CardHolderName VARCHAR(100),
    ExpiryDate DATE,
    CVV VARCHAR(3),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
