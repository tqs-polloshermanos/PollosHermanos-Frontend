package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Restaurant;
import main.java.com.example.polloshermanos.Repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }

    public Restaurant getRestaurantByName(String name) {
        Optional<Restaurant> restaurant = restaurantRepository.findByName(name);
        if(restaurant.isEmpty()) {
            throw new IllegalStateException("Restaurant with name " + name + " does not exist");
        }
        return restaurant.get();
    }
    
}
