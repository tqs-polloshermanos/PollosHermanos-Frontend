package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.Order;
import main.java.com.example.polloshermanos.Entities.User;
import main.java.com.example.polloshermanos.Entities.Restaurant;
import main.java.com.example.polloshermanos.Entities.OrderDetail;
import main.java.com.example.polloshermanos.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        logger.info("GET request received for all orders.");
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        logger.info("GET request received for order with ID: {}", id);
        Order order = orderService.getOrderById(id)
                .orElseThrow(() -> {
                    logger.warn("Order not fount with ID: {}", id);
                    return new RuntimeException("Order not found with id: " + id);
                });
        return ResponseEntity.ok().body(order);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        logger.info("POST request received to create a new order.");
        User user = order.getUser();
        Restaurant restaurant = order.getRestaurant();
        Long restaurantId = restaurant.getRestaurantId();
        List<OrderDetail> orderDetails = order.getOrderDetail();
        LocalDateTime orderDate = order.getOrderDate();
        
        orderService.createOrder(user, restaurantId, orderDetails, orderDate);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        logger.info("DELETE request received to delete order with ID: {}", id);
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
