package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long>{
    
}
