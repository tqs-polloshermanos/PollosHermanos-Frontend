package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.ProductIngredients;
import main.java.com.example.polloshermanos.Services.ProductIngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product-ingredients")
public class ProductIngredientsController {
    
    private final ProductIngredientsService productIngredientsService;

    @Autowired
    public ProductIngredientsController(ProductIngredientsService productIngredientsService) {
        this.productIngredientsService = productIngredientsService;
    }

    @GetMapping
    public ResponseEntity<List<ProductIngredients>> getAllProductIngredients() {
        List<ProductIngredients> productIngredients = productIngredientsService.getProductIngredients();
        return new ResponseEntity<>(productIngredients, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductIngredients> getProductIngredientsById(@PathVariable("id") Long id) {
        return productIngredientsService.getProductIngredientsById(id)
                    .map(productIngredient -> new ResponseEntity<>(productIngredient, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<ProductIngredients> createProductIngredients(@RequestBody ProductIngredients productIngredients) {
        ProductIngredients newProductIngredients = productIngredientsService.createProductIngredients(productIngredients);
        return new ResponseEntity<>(newProductIngredients, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductIngredients(@PathVariable("id") Long id) {
        productIngredientsService.deleteProductIngredients(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
