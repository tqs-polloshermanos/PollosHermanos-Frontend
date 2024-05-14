package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.OrderDetail;
import main.java.com.example.polloshermanos.Repositories.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {

    private static final Logger logger = LoggerFactory.getLogger(OrderDetailService.class);

    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    public OrderDetailService(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }

    public List<OrderDetail> getAllOrderDetails() {
        logger.info("Fetching all order details");
        return orderDetailRepository.findAll();
    }

    public Optional<OrderDetail> getOrderDetailById(Long id) {
        logger.info("Fetching order detail with id {}", id);
        return orderDetailRepository.findById(id);
    }

    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        logger.info("Creating new order detail for order id {}", orderDetail.getOrder().getOrderId());
        return orderDetailRepository.save(orderDetail);
    }

    @Transactional
    public void deleteOrderDetail(Long id) {
        logger.info("Deleting order detail with id {}", id);
        if (orderDetailRepository.existsById(id)) {
            orderDetailRepository.deleteById(id);
        } else {
            logger.error("OrderDetail with id {} not found", id);
            throw new EntityNotFoundException("OrderDetail with id " + id + " not found");
        }
    }
}
