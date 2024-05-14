package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>{
    List<Order> findByUserId(Long userId);
}
