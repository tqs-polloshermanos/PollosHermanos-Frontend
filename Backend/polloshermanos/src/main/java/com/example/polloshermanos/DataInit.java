package main.java.com.example.polloshermanos;

import main.java.com.example.polloshermanos.Entities.CuisineType;
import main.java.com.example.polloshermanos.Entities.Ingredient;
import main.java.com.example.polloshermanos.Entities.Order;
import main.java.com.example.polloshermanos.Entities.OrderDetail;
import main.java.com.example.polloshermanos.Entities.OrderStatus;
import main.java.com.example.polloshermanos.Entities.Payment;
import main.java.com.example.polloshermanos.Entities.Product;
import main.java.com.example.polloshermanos.Entities.ProductIngredients;
import main.java.com.example.polloshermanos.Entities.Restaurant;
import main.java.com.example.polloshermanos.Entities.RoleType;
import main.java.com.example.polloshermanos.Entities.Status;
import main.java.com.example.polloshermanos.Entities.User;

import main.java.com.example.polloshermanos.Services.IngredientService;
import main.java.com.example.polloshermanos.Services.OrderDetailService;
import main.java.com.example.polloshermanos.Services.OrderService;
import main.java.com.example.polloshermanos.Services.OrderStatusService;
import main.java.com.example.polloshermanos.Services.PaymentService;
import main.java.com.example.polloshermanos.Services.ProductIngredientsService;
import main.java.com.example.polloshermanos.Services.ProductService;
import main.java.com.example.polloshermanos.Services.RestaurantService;
import main.java.com.example.polloshermanos.Services.UserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

// This class is used to initialize the database with some dataS

public class DataInit implements CommandLineRunner{
    
    private final IngredientService ingredientService;
    private final OrderDetailService orderDetailService;
    private final OrderService orderService;
    private final OrderStatusService orderStatusService;
    private final PaymentService paymentService;
    private final ProductIngredientsService productIngredientsService;
    private final ProductService productService;
    private final RestaurantService restaurantService;
    private final UserService userService;
    private final Random random;

    public DataInit(IngredientService ingredientService, OrderDetailService orderDetailService, OrderService orderService, OrderStatusService orderStatusService, PaymentService paymentService, ProductIngredientsService productIngredientsService, ProductService productService, RestaurantService restaurantService, UserService userService) {
        this.ingredientService = ingredientService;
        this.orderDetailService = orderDetailService;
        this.orderService = orderService;
        this.orderStatusService = orderStatusService;
        this.paymentService = paymentService;
        this.productIngredientsService = productIngredientsService;
        this.productService = productService;
        this.restaurantService = restaurantService;
        this.userService = userService;
        this.random = new Random();
    }

    // Ingredient
    private void initializeIngredients() {
        Ingredient[] ingredients = {
            new Ingredient("Tomato", "Fresh tomatoes"),
            new Ingredient("Cheese", "Mozzarella cheese"),
            new Ingredient("Pepperoni", "Pepperoni slices"),
            new Ingredient("Mushrooms", "Fresh mushrooms"),
            new Ingredient("Onions", "Fresh onions"),
            new Ingredient("Green Peppers", "Fresh green peppers"),
            new Ingredient("Black Olives", "Black olives"),
            new Ingredient("Sausage", "Italian sausage"),
            new Ingredient("Bacon", "Bacon strips"),
            new Ingredient("Pineapple", "Pineapple chunks"),
            new Ingredient("Ham", "Ham slices"),
            new Ingredient("Beef", "Ground beef"),
            new Ingredient("Chicken", "Grilled chicken"),
            new Ingredient("Spinach", "Fresh spinach"),
            new Ingredient("Garlic", "Fresh garlic"),
            new Ingredient("Jalapenos", "Jalapeno peppers"),
            new Ingredient("Anchovies", "Anchovy fillets"),
            new Ingredient("Artichokes", "Artichoke hearts"),
            new Ingredient("Feta Cheese", "Feta cheese"),
            new Ingredient("Ricotta Cheese", "Ricotta cheese"),
            new Ingredient("Parmesan Cheese", "Parmesan cheese"),
            new Ingredient("Basil", "Fresh basil"),
            new Ingredient("Oregano", "Dried oregano"),
            new Ingredient("Parsley", "Fresh parsley"),
            new Ingredient("Rosemary", "Fresh rosemary"),
            new Ingredient("Thyme", "Fresh thyme"),
            new Ingredient("Cilantro", "Fresh cilantro"),
            new Ingredient("Cumin", "Ground cumin"),
            new Ingredient("Chili Powder", "Chili powder"),
            new Ingredient("Paprika", "Paprika"),
            new Ingredient("Cayenne Pepper", "Cayenne pepper"),
            new Ingredient("Crushed Red Pepper", "Crushed red pepper"),
            new Ingredient("Salt", "Salt"),
            new Ingredient("Pepper", "Black pepper"),
            // number of ingredients: 33
            // add more ingredients if needed
        };

        for(Ingredient ingredient : ingredients) {
            ingredientService.save(ingredient);
        }
    }

    // Restaurant
    private void initializeRestaurants() {
        Restaurant[] restaurants = {
            new Restaurant("Italian Place", "123 Main St", CuisineType.ITALIAN, "Italian cuisine", "img/italian.jpg"),
            new Restaurant("Mexican Place", "456 Elm St", CuisineType.MEXICAN, "Mexican cuisine", "img/mexican.jpg"),
            new Restaurant("Chinese Place", "789 Oak St", CuisineType.CHINESE, "Chinese cuisine", "img/chinese.jpg"),
            new Restaurant("Indian Place", "1011 Pine St", CuisineType.INDIAN, "Indian cuisine", "img/indian.jpg"),
            new Restaurant("American Place", "1213 Maple St", CuisineType.AMERICAN, "American cuisine", "img/american.jpg"),
            new Restaurant("Japanese Place", "1415 Cedar St", CuisineType.JAPANESE, "Japanese cuisine", "img/japanese.jpg"),
            new Restaurant("Thai Place", "1617 Birch St", CuisineType.THAI, "Thai cuisine", "img/thai.jpg"),
            new Restaurant("McDonald's", "2425 Pineapple St", CuisineType.FAST_FOOD, "Fast food", "img/mcdonalds.jpg"),
            new Restaurant("Burger King", "2627 Banana St", CuisineType.FAST_FOOD, "Fast food", "img/burgerking.jpg"),
            new Restaurant("Wendy's", "2829 Orange St", CuisineType.FAST_FOOD, "Fast food", "img/wendys.jpg"),
            new Restaurant("Taco Bell", "3031 Grape St", CuisineType.FAST_FOOD, "Fast food", "img/tacobell.jpg"),
            new Restaurant("KFC", "3233 Lemon St", CuisineType.FAST_FOOD, "Fast food", "img/kfc.jpg"),
            new Restaurant("Popeyes", "3435 Apple St", CuisineType.FAST_FOOD, "Fast food", "img/popeyes.jpg"),
            new Restaurant("Chick-fil-A", "3637 Peach St", CuisineType.FAST_FOOD, "Fast food", "img/chickfila.jpg"),
            new Restaurant("Subway", "3839 Pear St", CuisineType.FAST_FOOD, "Fast food", "img/subway.jpg"),
            new Restaurant("Pizza Hut", "4041 Plum St", CuisineType.FAST_FOOD, "Fast food", "img/pizzahut.jpg"),
            new Restaurant("Domino's", "4243 Cherry St", CuisineType.FAST_FOOD, "Fast food", "img/dominos.jpg"),
            new Restaurant("Papa John's", "4445 Blueberry St", CuisineType.FAST_FOOD, "Fast food", "img/papajohns.jpg"),
            new Restaurant("Little Caesars", "4647 Raspberry St", CuisineType.FAST_FOOD, "Fast food", "img/littlecaesars.jpg"),
            new Restaurant("Chipotle", "4849 Strawberry St", CuisineType.FAST_FOOD, "Fast food", "img/chipotle.jpg"),
            new Restaurant("Starbucks", "5051 Kiwi St", CuisineType.FAST_FOOD, "Fast food", "img/starbucks.jpg"),
            // number of restaurants: 20
            // add more restaurants if needed
        };

        for(Restaurant restaurant : restaurants) {
            restaurantService.save(restaurant);
        }
    }

    // Product
    private void initializeProducts() {
        Product[] products = {
            new Product("Pepperoni Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Pepperoni pizza", 10.99, "img/pepperoni.jpg"),
            new Product("Cheese Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Cheese pizza", 9.99, "img/cheese.jpg"),
            new Product("Margarita Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Margarita pizza", 11.99, "img/margarita.jpg"),
            new Product("Hawaiian Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Hawaiian pizza", 12.99, "img/hawaiian.jpg"),
            new Product("Vegetarian Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Vegetarian pizza", 11.99, "img/vegetarian.jpg"),
            new Product("Meat Lovers Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Meat lovers pizza", 13.99, "img/meatlovers.jpg"),
            new Product("Supreme Pizza", CuisineType.ITALIAN, restaurantService.findByName("Italian Place"), "Supreme pizza", 14.99, "img/supreme.jpg"),
            new Product("Taco Pizza", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Taco pizza", 11.99, "img/taco.jpg"),
            new Product("Burrito", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Burrito", 9.99, "img/burrito.jpg"),
            new Product("Taco", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Taco", 2.99, "img/taco.jpg"),
            new Product("Quesadilla", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Quesadilla", 8.99, "img/quesadilla.jpg"),
            new Product("Enchilada", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Enchilada", 7.99, "img/enchilada.jpg"),
            new Product("Chimichanga", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Chimichanga", 10.99, "img/chimichanga.jpg"),
            new Product("Nachos", CuisineType.MEXICAN, restaurantService.findByName("Mexican Place"), "Nachos", 6.99, "img/nachos.jpg"),
            new Product("Chinese Fried Rice", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "Chinese fried rice", 8.99, "img/friedrice.jpg"),
            new Product("Orange Chicken", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "Orange chicken", 10.99, "img/orangechicken.jpg"),
            new Product("General Tso's Chicken", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "General Tso's chicken", 11.99, "img/generaltsos.jpg"),
            new Product("Kung Pao Chicken", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "Kung pao chicken", 10.99, "img/kungpao.jpg"),
            new Product("Sweet and Sour Pork", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "Sweet and sour pork", 9.99, "img/sweetandsour.jpg"),
            new Product("Beef and Broccoli", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "Beef and broccoli", 11.99, "img/beefandbroccoli.jpg"),
            new Product("Egg Drop Soup", CuisineType.CHINESE, restaurantService.findByName("Chinese Place"), "Egg drop soup", 4.99, "img/eggdrop.jpg"),
            new Product("Chicken Tikka Masala", CuisineType.INDIAN, restaurantService.findByName("Indian Place"), "Chicken tikka masala", 12.99, "img/tikkamasala.jpg"),
            new Product("Butter Chicken", CuisineType.INDIAN, restaurantService.findByName("Indian Place"), "Butter chicken", 11.99, "img/butterchicken.jpg"),
            new Product("Naan", CuisineType.INDIAN, restaurantService.findByName("Indian Place"), "Naan", 2.99, "img/naan.jpg"),
            new Product("Samosa", CuisineType.INDIAN, restaurantService.findByName("Indian Place"), "Samosa", 1.99, "img/samosa.jpg"),
            new Product("Biryani", CuisineType.INDIAN, restaurantService.findByName("Indian Place"), "Biryani", 13.99, "img/biryani.jpg"),
            new Product("Chole Bhature", CuisineType.INDIAN, restaurantService.findByName("Indian Place"), "Chole bhature", 10.99, "img/cholebhature.jpg"),
            new Product("American Burger", CuisineType.AMERICAN, restaurantService.findByName("American Place"), "American burger", 9.99, "img/burger.jpg"),
            new Product("Hot Dog", CuisineType.AMERICAN, restaurantService.findByName("American Place"), "Hot dog", 3.99, "img/hotdog.jpg"),
            new Product("French Fries", CuisineType.AMERICAN, restaurantService.findByName("American Place"), "French fries", 2.99, "img/fries.jpg"),
            new Product("Onion Rings", CuisineType.AMERICAN, restaurantService.findByName("American Place"), "Onion rings", 4.99, "img/onionrings.jpg"),
            new Product("Chicken Wings", CuisineType.AMERICAN, restaurantService.findByName("American Place"), "Chicken wings", 8.99, "img/wings.jpg"),
            new Product("Chicken Tenders", CuisineType.AMERICAN, restaurantService.findByName("American Place"), "Chicken tenders", 7.99, "img/tenders.jpg"),
            new Product("Japanese Sushi", CuisineType.JAPANESE, restaurantService.findByName("Japanese Place"), "Japanese sushi", 14.99, "img/sushi.jpg"),
            new Product("Ramen", CuisineType.JAPANESE, restaurantService.findByName("Japanese Place"), "Ramen", 11.99, "img/ramen.jpg"),
            new Product("Tempura", CuisineType.JAPANESE, restaurantService.findByName("Japanese Place"), "Tempura", 10.99, "img/tempura.jpg"),
            new Product("Udon", CuisineType.JAPANESE, restaurantService.findByName("Japanese Place"), "Udon", 12.99, "img/udon.jpg"),
            new Product("Sashimi", CuisineType.JAPANESE, restaurantService.findByName("Japanese Place"), "Sashimi", 13.99, "img/sashimi.jpg"),
            new Product("Thai Curry", CuisineType.THAI, restaurantService.findByName("Thai Place"), "Thai curry", 12.99, "img/curry.jpg"),
            new Product("Pad Thai", CuisineType.THAI, restaurantService.findByName("Thai Place"), "Pad thai", 11.99, "img/padthai.jpg"),
            new Product("Tom Yum Soup", CuisineType.THAI, restaurantService.findByName("Thai Place"), "Tom yum soup", 5.99, "img/tomyum.jpg"),
            new Product("Spring Rolls", CuisineType.THAI, restaurantService.findByName("Thai Place"), "Spring rolls", 6.99, "img/springrolls.jpg"),
            new Product("Papaya Salad", CuisineType.THAI, restaurantService.findByName("Thai Place"), "Papaya salad", 7.99, "img/papayasalad.jpg"),
            new Product("Big Mac", CuisineType.FAST_FOOD, restaurantService.findByName("McDonald's"), "Big Mac", 4.99, "img/bigmac.jpg"),
            new Product("Whopper", CuisineType.FAST_FOOD, restaurantService.findByName("Burger King"), "Whopper", 5.99, "img/whopper.jpg"),
            new Product("Frosty", CuisineType.FAST_FOOD, restaurantService.findByName("Wendy's"), "Frosty", 1.99, "img/frosty.jpg"),
            new Product("Crunchwrap Supreme", CuisineType.FAST_FOOD, restaurantService.findByName("Taco Bell"), "Crunchwrap supreme", 3.99, "img/crunchwrap.jpg"),
            new Product("Chicken Sandwich", CuisineType.FAST_FOOD, restaurantService.findByName("KFC"), "Chicken sandwich", 4.99, "img/chickensandwich.jpg"),
            new Product("Chicken Sandwich", CuisineType.FAST_FOOD, restaurantService.findByName("Popeyes"), "Chicken sandwich", 4.99, "img/chickensandwich.jpg"),
            new Product("Chicken Sandwich", CuisineType.FAST_FOOD, restaurantService.findByName("Chick-fil-A"), "Chicken sandwich", 4.99, "img/chickensandwich.jpg"),
            new Product("Sub", CuisineType.FAST_FOOD, restaurantService.findByName("Subway"), "Sub", 5.99, "img/sub.jpg"),
            new Product("Pizza", CuisineType.FAST_FOOD, restaurantService.findByName("Pizza Hut"), "Pizza", 9.99, "img/pizza.jpg"),
            new Product("Pizza", CuisineType.FAST_FOOD, restaurantService.findByName("Domino's"), "Pizza", 9.99, "img/pizza.jpg"),
            new Product("Pizza", CuisineType.FAST_FOOD, restaurantService.findByName("Papa John's"), "Pizza", 9.99, "img/pizza.jpg"),
            new Product("Pizza", CuisineType.FAST_FOOD, restaurantService.findByName("Little Caesars"), "Pizza", 9.99, "img/pizza.jpg"),
            new Product("Burrito", CuisineType.FAST_FOOD, restaurantService.findByName("Chipotle"), "Burrito", 7.99, "img/burrito.jpg"),
            new Product("Coffee", CuisineType.FAST_FOOD, restaurantService.findByName("Starbucks"), "Coffee", 2.99, "img/coffee.jpg"),
            new Product("Coffee", CuisineType.FAST_FOOD, restaurantService.findByName("Starbucks"), "Coffee", 2.99, "img/coffee.jpg"),
            // number of products: 60
            // add more products if needed
        };

        for(Product product : products) {
            productService.save(product);
        }
    }

    // ProductIngredients
    private void initializeProductIngredients() {
        Map<String, List<String>> productToIngredientsMap = new HashMap<>();
        productToIngredientsMap.put("Pepperoni Pizza", Arrays.asList("Cheese", "Pepperoni"));
        productToIngredientsMap.put("Cheese Pizza", Collections.singletonList("Cheese"));
        productToIngredientsMap.put("Margarita Pizza", Arrays.asList("Cheese", "Tomato", "Basil"));
        productToIngredientsMap.put("Hawaiian Pizza", Arrays.asList("Cheese", "Ham", "Pineapple"));
        productToIngredientsMap.put("Vegetarian Pizza", Arrays.asList("Cheese", "Tomato", "Mushrooms", "Onions", "Green Peppers", "Black Olives"));
        productToIngredientsMap.put("Meat Lovers Pizza", Arrays.asList("Cheese", "Pepperoni", "Sausage", "Bacon", "Ham"));
        productToIngredientsMap.put("Supreme Pizza", Arrays.asList("Cheese", "Pepperoni", "Sausage", "Onions", "Green Peppers", "Black Olives"));
        productToIngredientsMap.put("Taco Pizza", Arrays.asList("Cheese", "Beef", "Tomato", "Lettuce", "Cheddar Cheese", "Taco Sauce"));
        productToIngredientsMap.put("Burrito", Arrays.asList("Beef", "Beans", "Rice", "Tomato", "Lettuce", "Sour Cream", "Guacamole"));
        productToIngredientsMap.put("Taco", Arrays.asList("Beef", "Lettuce", "Cheddar Cheese", "Tomato", "Taco Sauce"));
        productToIngredientsMap.put("Quesadilla", Arrays.asList("Chicken", "Cheese", "Onions", "Peppers", "Sour Cream", "Guacamole"));
        productToIngredientsMap.put("Enchilada", Arrays.asList("Chicken", "Cheese", "Corn Tortillas", "Enchilada Sauce", "Olives", "Onions"));
        productToIngredientsMap.put("Chimichanga", Arrays.asList("Beef", "Cheese", "Flour Tortilla", "Beans", "Rice", "Salsa"));
        productToIngredientsMap.put("Nachos", Arrays.asList("Chips", "Cheese", "Beans", "Sour Cream", "Guacamole", "Salsa"));
        productToIngredientsMap.put("Chinese Fried Rice", Arrays.asList("Rice", "Soy Sauce", "Peas", "Carrots", "Egg", "Green Onions"));
        productToIngredientsMap.put("Orange Chicken", Arrays.asList("Chicken", "Orange Sauce", "Rice"));
        productToIngredientsMap.put("General Tso's Chicken", Arrays.asList("Chicken", "General Tso's Sauce", "Rice"));
        productToIngredientsMap.put("Kung Pao Chicken", Arrays.asList("Chicken", "Kung Pao Sauce", "Rice", "Peppers", "Peanuts"));
        productToIngredientsMap.put("Sweet and Sour Pork", Arrays.asList("Pork", "Sweet and Sour Sauce", "Rice", "Pineapple", "Bell Peppers"));
        productToIngredientsMap.put("Beef and Broccoli", Arrays.asList("Beef", "Broccoli", "Soy Sauce", "Rice"));
        productToIngredientsMap.put("Egg Drop Soup", Arrays.asList("Chicken Broth", "Egg", "Green Onions"));
        productToIngredientsMap.put("Chicken Tikka Masala", Arrays.asList("Chicken", "Tikka Masala Sauce", "Rice", "Naan"));
        productToIngredientsMap.put("Butter Chicken", Arrays.asList("Chicken", "Butter Sauce", "Rice", "Naan"));
        productToIngredientsMap.put("Naan", Arrays.asList("Flour", "Yogurt", "Baking Powder"));
        productToIngredientsMap.put("Samosa", Arrays.asList("Potatoes", "Peas", "Spices", "Pastry Dough"));
        productToIngredientsMap.put("Biryani", Arrays.asList("Chicken", "Rice", "Spices", "Yogurt", "Tomato", "Onions"));
        productToIngredientsMap.put("Chole Bhature", Arrays.asList("Chickpeas", "Flour", "Yogurt", "Spices"));
        productToIngredientsMap.put("American Burger", Arrays.asList("Beef Patty", "Bun", "Lettuce", "Tomato", "Onions", "Pickles", "Ketchup", "Mustard"));
        productToIngredientsMap.put("Hot Dog", Arrays.asList("Hot Dog Bun", "Hot Dog", "Ketchup", "Mustard", "Relish"));
        productToIngredientsMap.put("French Fries", Collections.singletonList("Potatoes"));
        productToIngredientsMap.put("Onion Rings", Collections.singletonList("Onions"));
        productToIngredientsMap.put("Chicken Wings", Arrays.asList("Chicken Wings", "Buffalo Sauce", "Blue Cheese Dressing", "Celery"));
        productToIngredientsMap.put("Chicken Tenders", Arrays.asList("Chicken Tenders", "Bread Crumbs", "Honey Mustard Sauce"));
        productToIngredientsMap.put("Japanese Sushi", Arrays.asList("Rice", "Nori", "Fish", "Vegetables", "Soy Sauce", "Wasabi", "Ginger"));
        productToIngredientsMap.put("Ramen", Arrays.asList("Ramen Noodles", "Broth", "Egg", "Pork", "Green Onions", "Bean Sprouts"));
        productToIngredientsMap.put("Tempura", Arrays.asList("Shrimp", "Vegetables", "Tempura Batter", "Soy Sauce"));
        productToIngredientsMap.put("Udon", Arrays.asList("Udon Noodles", "Broth", "Fish Cake", "Green Onions", "Mushrooms", "Tempura"));
        productToIngredientsMap.put("Sashimi", Arrays.asList("Fish", "Wasabi", "Soy Sauce", "Ginger"));
        productToIngredientsMap.put("Thai Curry", Arrays.asList("Chicken", "Vegetables", "Coconut Milk", "Thai Curry Paste", "Rice"));
        productToIngredientsMap.put("Pad Thai", Arrays.asList("Rice Noodles", "Shrimp", "Tofu", "Bean Sprouts", "Egg", "Peanuts", "Lime"));
        productToIngredientsMap.put("Tom Yum Soup", Arrays.asList("Chicken Broth", "Shrimp", "Mushrooms", "Lemongrass", "Chili Paste", "Lime"));
        productToIngredientsMap.put("Spring Rolls", Arrays.asList("Rice Paper", "Shrimp", "Vegetables", "Rice Noodles", "Peanut Sauce"));
        productToIngredientsMap.put("Papaya Salad", Arrays.asList("Green Papaya", "Tomatoes", "Green Beans", "Carrots", "Peanuts", "Lime", "Fish Sauce"));
        productToIngredientsMap.put("Big Mac", Arrays.asList("Beef Patty", "Bun", "Lettuce", "Cheese", "Pickles", "Onions", "Special Sauce"));
        productToIngredientsMap.put("Whopper", Arrays.asList("Beef Patty", "Bun", "Lettuce", "Tomato", "Onions", "Pickles", "Mayonnaise", "Ketchup"));
        productToIngredientsMap.put("Frosty", Arrays.asList("Ice Cream", "Milk", "Chocolate Syrup"));
        productToIngredientsMap.put("Crunchwrap Supreme", Arrays.asList("Tortilla", "Beef", "Cheese", "Lettuce", "Tomato", "Sour Cream", "Taco Sauce"));
        productToIngredientsMap.put("Chicken Sandwich", Arrays.asList("Chicken Patty", "Bun", "Lettuce", "Tomato", "Pickles", "Mayonnaise"));
        productToIngredientsMap.put("Sub", Arrays.asList("Bread", "Meats", "Cheese", "Lettuce", "Tomato", "Onions", "Mayonnaise", "Mustard"));
        productToIngredientsMap.put("Pizza", Arrays.asList("Dough", "Tomato Sauce", "Cheese", "Toppings"));
        productToIngredientsMap.put("Burrito", Arrays.asList("Tortilla", "Rice", "Beans", "Meat", "Cheese", "Salsa", "Sour Cream", "Guacamole"));
        productToIngredientsMap.put("Coffee", Arrays.asList("Coffee Beans", "Water", "Milk", "Sugar"));
        // number of product_ingredients: 51
        // add more product_ingredients if needed
        
        List<Product> products = productService.getAllProducts();
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        
        for (Product product : products) {
            List<String> ingredientNames = productToIngredientsMap.get(product.getProductName());
            if (ingredientNames != null) {
                List<Ingredient> productIngredients = new ArrayList<>();
                for (String ingredientName : ingredientNames) {
                    for (Ingredient ingredient : ingredients) {
                        if (ingredient.getName().equals(ingredientName)) {
                            productIngredients.add(ingredient);
                            break;
                        }
                    }
                }

                for (Ingredient ingredient : productIngredients) {
                    ProductIngredients productIngredient = new ProductIngredients(product, ingredient);
                    productIngredientsService.save(productIngredient);
                }
            }
        }
    }

    // User
    private void initializeUsers() {
        User[] users = {
            new User("admin@polloshermanos.com", "adminPassword", RoleType.ADMIN),
            new User("test_user1@gmail.com", "test_user1Password", RoleType.USER),
            new User("test_user2@gmail.com", "test_user2Password", RoleType.USER),
            new User("test_employee1@polloshermanos.com", "test_employee1Password", RoleType.EMPLOYEE),
            new User("test_employee2@polloshermanos.com", "test_employee2Password", RoleType.EMPLOYEE),
            // number of users: 5
            // add more users if needed
        };

        for(User user : users) {
            userService.save(user);
        }
    }

    // OrderDetails
    private void initializeOrderDetails() {
        List<Product> products = productService.getAllProducts();
        List<User> users = userService.getAllUsers();
        List<Order> orders = orderService.getAllOrders();

        orders_size = 5; // number of init orders

        for (int i = 0; i < orders_size; i++) {
            int numOrderDetails = random.nextInt(5) + 1;
            for (int i = 0; i < numOrderDetails; i++) {
                Product product = products.get(random.nextInt(products.size()));
                int quantity = random.nextInt(5) + 1;
                OrderDetail orderDetail = new OrderDetail(order, product, quantity, product.getPrice()*quantity);
                orderDetailService.save(orderDetail);
            }
        }
        // number of order_details: 5
        // add more order_details if needed
    }
    
    // Order
    private void initializeOrders() {
        List<User> users = userService.getAllUsers();
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        List<OrderDetail> orderDetails = orderDetailService.getAllOrderDetails();

        for (int i = 0; i < 5; i++) {
            User user = users.get(random.nextInt(users.size()));
            Restaurant restaurant = restaurants.get(random.nextInt(restaurants.size()));
            LocalDateTime orderDate = LocalDateTime.now();
            double totalAmount = 0;
            for (OrderDetail orderDetail : orderDetails) {
                totalAmount += orderDetail.getPrice();
            }
            Order order = new Order(user, restaurant, orderDetail, orderDate, totalAmount);
            orderService.save(order);
        }
        // number of orders: 5
        // add more orders if needed
    }

    // OrderStatus
    private void initializeOrderStatuses() {
        List<Order> orders = orderService.getAllOrders();
        List<Status> statuses = Arrays.asList(Status.values());

        for (Order order : orders) {
            Status status = statuses.get(random.nextInt(statuses.size()));
            LocalDateTime statusDate = LocalDateTime.now();
            OrderStatus orderStatus = new OrderStatus(order, status, statusDate);
            orderStatusService.save(orderStatus);
        }
        // number of order_statuses: 5
        // add more order_statuses if needed
    }

    // Payment
    private void initializePayments() {
        List<Order> orders = orderService.getAllOrders();

        for (Order order : orders) {
            LocalDateTime paymentDate = LocalDateTime.now();
            double amount = order.getTotalAmount();
            String cardNumber = "1234567890123456";
            String cardHolderName = "John Doe";
            LocalDate cardExpiryDate = LocalDate.of(2023, 12, 31);
            String cardCVV = "123";
            Payment payment = new Payment(order, paymentDate, amount, cardNumber, cardHolderName, cardExpiryDate, cardCVV);
            paymentService.save(payment);
        }
        // number of payments: 5
        // add more payments if needed
    }
    
}
