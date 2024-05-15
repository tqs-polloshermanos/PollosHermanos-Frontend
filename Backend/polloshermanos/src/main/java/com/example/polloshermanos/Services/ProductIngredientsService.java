package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.ProductIngredients;
import main.java.com.example.polloshermanos.Repositories.ProductIngredientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductIngredientsService {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductIngredientsService.class);
    
    private final ProductIngredientsRepository productIngredientsRepository;

    @Autowired
    public ProductIngredientsService(ProductIngredientsRepository productIngredientsRepository) {
        this.productIngredientsRepository = productIngredientsRepository;
    }

    public List<ProductIngredients> getProductIngredients() {
        logger.info("Fetching all product ingredients");
        return productIngredientsRepository.findAll();
    }

    public Optional<ProductIngredients> getProductIngredientsById(Long id) {
        logger.info("Fetching product ingredients with id {}", id);
        return productIngredientsRepository.findById(id);
    }

    public ProductIngredients createProductIngredients(ProductIngredients productIngredients) {
        logger.info("Creating new product ingredients for product id {}", productIngredients.getProduct().getProductId());
        return productIngredientsRepository.save(productIngredients);
    }

    @Transactional
    public void deleteProductIngredients(Long id) {
        logger.info("Deleting product ingredients with id {}", id);
        if (productIngredientsRepository.existsById(id)) {
            productIngredientsRepository.deleteById(id);
        } else {
            logger.error("ProductIngredients with id {} not found", id);
            throw new EntityNotFoundException("ProductIngredients with id " + id + " not found");
        }
    }
}
