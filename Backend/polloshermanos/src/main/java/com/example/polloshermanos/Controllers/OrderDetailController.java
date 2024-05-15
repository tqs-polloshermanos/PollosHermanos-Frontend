package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.OrderDetail;
import main.java.com.example.polloshermanos.Services.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/orderDetails")
public class OrderDetailController {

    private final Logger logger = LoggerFactory.getLogger(OrderDetailController.class);

    private final OrderDetailService orderDetailService;

    @Autowired
    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        logger.info("GET request received for all order details.");
        List<OrderDetail> orderDetails = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok().body(orderDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        logger.info("GET request received for order detail with ID: {}", id);
        OrderDetail orderDetail = orderDetailService.getOrderDetailById(id)
                .orElseThrow(() -> {
                    logger.warn("Order detail not found with ID: {}", id);
                    return new RuntimeException("Order Detail not found with id: {}" + id);
                });
        return ResponseEntity.ok().body(orderDetail);
    }

    @PostMapping
    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail) {
        logger.info("POST request received to create a new order detail.");
        OrderDetail newOrderDetail = orderDetailService.createOrderDetail(orderDetail);
        return ResponseEntity<>(newOrderDetail, HttpStatus.CREATED).body(newOrderDetail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderDetail(@PathVariable Long id) {
        logger.info("DELETE request received to delete order detail with ID: {}", id);
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }
}
