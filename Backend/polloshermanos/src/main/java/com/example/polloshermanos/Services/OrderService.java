package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Order;
import main.java.com.example.polloshermanos.Entities.User;
import main.java.com.example.polloshermanos.Entities.OrderDetail;
import main.java.com.example.polloshermanos.Entities.Restaurant;

import main.java.com.example.polloshermanos.Repositories.OrderRepository;
import main.java.com.example.polloshermanos.Repositories.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, RestaurantRepository restaurantRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public List<Order> getAllOrders() {
        logger.info("Fetching all orders");
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        logger.info("Fetching order with id {}", id);
        return orderRepository.findById(id);
    }

    @Transactional
    public void createOrder(User user, Long restaurantId, List<OrderDetail> orderDetail, LocalDateTime orderDate) {
        logger.info("Creating new order for user id {} at restaurant id {}", user.getId(), restaurantId);
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        // Increment and get the new number of orders for the restaurant
        restaurant.incrementNumberOfOrders();
        restaurantRepository.save(restaurant);

        // Create a new order with the updated number of orders from the restaurant
        Order order = new Order(user, restaurant, orderDetail, orderDate);
        order.setNumberOfOrder(restaurant.getNumberOfOrders());

        // Save the order
        orderRepository.save(order);
        logger.info("Order created successfully with id {}", order.getId());
    }
    
    @Transactional
    public void deleteOrder(Long id) {
        logger.info("Deleting order with id {}", id);
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
        } else {
            logger.error("Order with id {} not found", id);
            throw new EntityNotFoundException("Order with id " + id + " not found");
        }
    }
}
