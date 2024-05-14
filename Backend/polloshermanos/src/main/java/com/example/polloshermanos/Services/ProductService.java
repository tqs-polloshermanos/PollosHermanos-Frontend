package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Product;
import main.java.com.example.polloshermanos.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts() {
        logger.info("Fetching all products");
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        logger.info("Fetching product with id {}", id);
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        logger.info("Creating new product with name {}", product.getProductName());
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        logger.info("Deleting product with id {}", id);
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }
        else {
            logger.error("Product with id {} not found", id);
            throw new EntityNotFoundException("Product with id " + id + " not found");
        }
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        logger.info("Updating product with id {}", id);
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setProductName(updatedProduct.getProductName());
            product.setCuisineType(updatedProduct.getCuisineType());
            product.setRestaurant(updatedProduct.getRestaurant());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            Product updated = productRepository.save(product);
            logger.info("Updated product with id {}", id);
            return updated;
        } else {
            logger.error("Product with id {} not found", id);
            throw new IllegalArgumentException("Product with id " + id + " not found.");
        }
    }
}
