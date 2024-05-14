package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.Ingredient;
import main.java.com.example.polloshermanos.Services.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private static final Logger logger = LoggerFactory.getLogger(IngredientController.class);

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        logger.info("GET request received for all ingredients.");
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        return new ResponseEntity<>(ingredients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        logger.info("GET request received for ingredients with ID: {}", id);
        Ingredient ingredient = ingredientService.getIngredientById(id)
                .orElse(null);
        if (ingredient != null){
            return new ResponseEntity<>(ingredient, HttpStatus.OK);   
        }
        else{
            logger.warn("Ingredient not found with ID: {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(@RequestBody Ingredient ingredient) {
        logger.info("POST request received to create a new ingredient.");
        Ingredient newIngredient = ingredientService.createIngredient(ingredient);
        return new ResponseEntity<>(newIngredient, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIngredient(@PathVariable Long id) {
        logger.info("DELETE request received to delete ingredient with ID: {}", id);
        ingredientService.deleteIngredient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
