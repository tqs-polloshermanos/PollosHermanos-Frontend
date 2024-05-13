package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>{
    
}
