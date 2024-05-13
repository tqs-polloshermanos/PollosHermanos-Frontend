package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.ProductIngredients;
import main.java.com.example.polloshermanos.Repositories.ProductIngredientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductIngredientsService {
    
    private final ProductIngredientsRepository productIngredientsRepository;

    @Autowired
    public ProductIngredientsService(ProductIngredientsRepository productIngredientsRepository) {
        this.productIngredientsRepository = productIngredientsRepository;
    }

    public List<ProductIngredients> getProductIngredients() {
        return productIngredientsRepository.findAll();
    }

    public Optional<ProductIngredients> getProductIngredientsById(Long id) {
        return productIngredientsRepository.findById(id);
    }

    public ProductIngredients createProductIngredients(ProductIngredients productIngredients) {
        return productIngredientsRepository.save(productIngredients);
    }

    public void deleteProductIngredients(Long id) {
        productIngredientsRepository.deleteById(id);
    }
}
