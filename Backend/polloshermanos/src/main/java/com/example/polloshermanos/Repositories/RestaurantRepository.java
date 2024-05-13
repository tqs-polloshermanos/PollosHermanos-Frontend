package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
    
}
