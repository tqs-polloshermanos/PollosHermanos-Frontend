package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Restaurant;
import main.java.com.example.polloshermanos.Repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private static final Logger logger = LoggerFactory.getLogger(RestaurantService.class);

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getRestaurants() {
        logger.info("Fetching all restaurants");
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        logger.info("Fetching restaurant with id {}", id);
        return restaurantRepository.findById(id);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        logger.info("Creating new restaurant with name {}", restaurant.getRestaurantName());
        return restaurantRepository.save(restaurant);
    }

    @Transactional
    public void deleteRestaurant(Long id) {
        logger.info("Deleting restaurant with id {}", id);
        if (restaurantRepository.existsById(id)) {
            restaurantRepository.deleteById(id);
        } else {
            logger.error("Restaurant with id {} not found", id);
            throw new EntityNotFoundException("Restaurant with id " + id + " not found");
        }
    }

    public Restaurant getRestaurantByName(String name) {
        logger.info("Fetching restaurant with name {}", name);
        Optional<Restaurant> restaurant = restaurantRepository.findByName(name);
        if (restaurant.isEmpty()) {
            logger.error("Restaurant with name {} does not exist", name);
            throw new IllegalStateException("Restaurant with name " + name + " does not exist");
        }
        return restaurant.get();
    }
    
}
