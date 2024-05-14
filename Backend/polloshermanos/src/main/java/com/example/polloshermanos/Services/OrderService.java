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

OrderStatusService

java

package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.OrderStatus;
import main.java.com.example.polloshermanos.Repositories.OrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderStatusService {

    private static final Logger logger = LoggerFactory.getLogger(OrderStatusService.class);

    private final OrderStatusRepository orderStatusRepository;

    @Autowired
    public OrderStatusService(OrderStatusRepository orderStatusRepository) {
        this.orderStatusRepository = orderStatusRepository;
    }

    public List<OrderStatus> getAllOrderStatus() {
        logger.info("Fetching all order statuses");
        return orderStatusRepository.findAll();
    }

    public Optional<OrderStatus> getOrderStatusById(Long id) {
        logger.info("Fetching order status with id {}", id);
        return orderStatusRepository.findById(id);
    }

    public OrderStatus createOrderStatus(OrderStatus orderStatus) {
        logger.info("Creating new order status with name {}", orderStatus.getStatus());
        return orderStatusRepository.save(orderStatus);
    }

    @Transactional
    public void deleteOrderStatus(Long id) {
        logger.info("Deleting order status with id {}", id);
        if (orderStatusRepository.existsById(id)) {
            orderStatusRepository.deleteById(id);
        } else {
            logger.error("OrderStatus with id {} not found", id);
            throw new EntityNotFoundException("OrderStatus with id " + id + " not found");
        }
    }
}

PaymentService

java

package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Payment;
import main.java.com.example.polloshermanos.Repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        logger.info("Fetching all payments");
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        logger.info("Fetching payment with id {}", id);
        return paymentRepository.findById(id);
    }

    public Payment createPayment(Payment payment) {
        logger.info("Creating new payment with amount {}", payment.getAmount());
        return paymentRepository.save(payment);
    }

    @Transactional
    public void deletePayment(Long id) {
        logger.info("Deleting payment with id {}", id);
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
        } else {
            logger.error("Payment with id {} not found", id);
            throw new EntityNotFoundException("Payment with id " + id + " not found");
        }
    
}
