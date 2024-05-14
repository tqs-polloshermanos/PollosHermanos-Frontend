package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Ingredient;
import main.java.com.example.polloshermanos.Repositories.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    private static final Logger logger = LoggerFactory.getLogger(IngredientService.class);

    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> getAllIngredients() {
        logger.info("Fetching all ingredients");
        return ingredientRepository.findAll();
    }

    public Optional<Ingredient> getIngredientById(Long id) {
        logger.info("Fetching ingredient with id {}", id);
        return ingredientRepository.findById(id);
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        logger.info("Creating new ingredient with name {}", ingredient.getName());
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public void deleteIngredient(Long id) {
        logger.info("Deleting ingredient with id {}", id);
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
        }
        else {
            logger.error("Ingredient with id {} not found", id);
            throw new EntityNotFoundException("Ingredient with id " + id + " not found");
        }
    }
}
