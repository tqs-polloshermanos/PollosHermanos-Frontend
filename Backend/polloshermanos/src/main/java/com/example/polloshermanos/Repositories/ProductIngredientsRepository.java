package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.ProductIngredients;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductIngredientsRepository extends JpaRepository<ProductIngredients, Long>{
    
}
