package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

@Entity
@Table(name = "Restaurants")
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long restaurantId;

    @Column(nullable = false, name = "restaurant_name")
    private String restaurantName;

    @Column(nullable = false, name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "cuisine_type")
    private CuisineType cuisineType;

    @Column(name = "description")
    private String description;

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public CuisineType getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(CuisineType cuisineType) {
        this.cuisineType = cuisineType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
