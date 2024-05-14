package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.Restaurant;
import main.java.com.example.polloshermanos.Services.RestaurantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/restaurants")
public class RestaurantController {

    private final Logger logger = LoggerFactory.getLogger(RestaurantController.class);

    private final RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        logger.info("GET request received for all restaurants.");
        List<Restaurant> restaurants = restaurantService.getRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") Long id) {
        logger.info("GET request received for restaurant with ID: {}", id);
        return restaurantService.getRestaurantById(id)
                    .map(restaurant -> new ResponseEntity<>(restaurant, HttpStatus.OK))
                    .orElseGet(() -> {
                        logger.warn("Restaurant not found with ID: {}", id);
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    });
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Restaurant> getRestaurantByName(@PathVariable("name") String name) {
        logger.info("GET request received for restaurant with name: {}", name);
        try {
            Restaurant restaurant = restaurantService.getRestaurantByName(name);
            return new ResponseEntity<>(restaurant, HttpStatus.OK);
        } catch (IllegalStateException e) {
            logger.warn("Restaurant not found with name: {}", name);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        logger.info("POST request received to create a new restaurant.");
        Restaurant newRestaurant = restaurantService.createRestaurant(restaurant);
        return new ResponseEntity<>(newRestaurant, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRestaurant(@PathVariable("id") Long id) {
        logger.info("DELETE request received to delete restaurant with ID: {}", id);
        restaurantService.deleteRestaurant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
