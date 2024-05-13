package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long>{
    
}
