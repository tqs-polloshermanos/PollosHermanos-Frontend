package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

@Entity
@Table(name = "Ingredients")
public class Ingredient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long ingredientId;

    @Column(nullable = false, name = "ingredient_name")
    private String ingredientName;

    @Column(name = "description")
    private String description;

    public Ingredient(String ingredientName, String description) {
        this.ingredientName = ingredientName;
        this.description = description;
    }

    public Ingredient(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    public Ingredient() {
    }

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((ingredientId == null) ? 0 : ingredientId.hashCode());
        result = prime * result + ((ingredientName == null) ? 0 : ingredientName.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
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
        Ingredient other = (Ingredient) obj;
        if (ingredientId == null) {
            if (other.ingredientId != null)
                return false;
        } else if (!ingredientId.equals(other.ingredientId))
            return false;
        if (ingredientName == null) {
            if (other.ingredientName != null)
                return false;
        } else if (!ingredientName.equals(other.ingredientName))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Ingredient [ingredientId=" + ingredientId + ", ingredientName=" + ingredientName + ", description="
                + description + "]";
    }
}
