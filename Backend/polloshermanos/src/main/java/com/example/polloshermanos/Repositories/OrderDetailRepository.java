package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{
    
}
