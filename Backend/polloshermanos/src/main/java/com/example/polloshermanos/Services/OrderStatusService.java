package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.OrderStatus;
import main.java.com.example.polloshermanos.Repositories.OrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
