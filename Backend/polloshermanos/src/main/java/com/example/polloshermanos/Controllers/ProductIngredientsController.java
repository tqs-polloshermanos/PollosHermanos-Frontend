package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.ProductIngredients;
import main.java.com.example.polloshermanos.Services.ProductIngredientsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product-ingredients")
public class ProductIngredientsController {

    private final Logger logger = LoggerFactory.getLogger(ProductIngredientsController.class);
    
    private final ProductIngredientsService productIngredientsService;

    @Autowired
    public ProductIngredientsController(ProductIngredientsService productIngredientsService) {
        this.productIngredientsService = productIngredientsService;
    }

    @GetMapping
    public ResponseEntity<List<ProductIngredients>> getAllProductIngredients() {
        logger.info("GET request received for all product ingredients.");
        List<ProductIngredients> productIngredients = productIngredientsService.getProductIngredients();
        return new ResponseEntity<>(productIngredients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductIngredients> getProductIngredientsById(@PathVariable("id") Long id) {
        logger.info("GET request received for product ingredient with ID: {}", id);
        return productIngredientsService.getProductIngredientsById(id)
                    .map(productIngredient -> new ResponseEntity<>(productIngredient, HttpStatus.OK))
                    .orElseGet(() -> {
                        logger.warn("Product ingredient not found with ID: {}", id);
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    });
    }

    @PostMapping
    public ResponseEntity<ProductIngredients> createProductIngredients(@RequestBody ProductIngredients productIngredients) {
        logger.info("POST request received to create a new product ingredient.");
        ProductIngredients newProductIngredients = productIngredientsService.createProductIngredients(productIngredients);
        return new ResponseEntity<>(newProductIngredients, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductIngredients(@PathVariable("id") Long id) {
        logger.info("DELETE request received to delete product ingredient with ID: {}", id);
        productIngredientsService.deleteProductIngredients(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
