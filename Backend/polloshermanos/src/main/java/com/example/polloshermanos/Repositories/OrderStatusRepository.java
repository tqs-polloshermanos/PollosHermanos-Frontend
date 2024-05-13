package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long>{
    
}
