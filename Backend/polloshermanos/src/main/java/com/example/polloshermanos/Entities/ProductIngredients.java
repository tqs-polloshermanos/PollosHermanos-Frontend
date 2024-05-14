package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

@Entity
@Table(name = "product_ingredients")
public class ProductIngredients {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_ingredients_id")
    private Long productIngredientsId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "ingredient_id")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(nullable = false, name = "product_id")
    private Product product;

    @Column(nullable = false, name = "quantity")
    private int quantity;

    public ProductIngredients(Ingredient ingredient, Product product, int quantity) {
        this.ingredient = ingredient;
        this.product = product;
        this.quantity = quantity;
    }

    public ProductIngredients() {
    }

    public Long getProductIngredientsId() {
        return productIngredientsId;
    }

    public void setProductIngredientsId(Long productIngredientsId) {
        this.productIngredientsId = productIngredientsId;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((productIngredientsId == null) ? 0 : productIngredientsId.hashCode());
        result = prime * result + ((ingredient == null) ? 0 : ingredient.hashCode());
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        result = prime * result + quantity;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProductIngredients other = (ProductIngredients) obj;
        if (productIngredientsId == null) {
            if (other.productIngredientsId != null)
                return false;
        } else if (!productIngredientsId.equals(other.productIngredientsId))
            return false;
        if (ingredient == null) {
            if (other.ingredient != null)
                return false;
        } else if (!ingredient.equals(other.ingredient))
            return false;
        if (product == null) {
            if (other.product != null)
                return false;
        } else if (!product.equals(other.product))
            return false;
        if (quantity != other.quantity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "ProductIngredients [productIngredientsId=" + productIngredientsId + ", ingredient=" + ingredient
                + ", product=" + product + ", quantity=" + quantity + "]";
    }

}
