package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.OrderStatus;
import main.java.com.example.polloshermanos.Services.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/orderStatus")
public class OrderStatusController {

    private final Logger logger = LoggerFactory.getLogger(OrderStatusController.class);

    private final OrderStatusService orderStatusService;

    @Autowired
    public OrderStatusController(OrderStatusService orderStatusService) {
        this.orderStatusService = orderStatusService;
    }

    @GetMapping
    public ResponseEntity<List<OrderStatus>> getAllOrderStatus() {
        logger.info("GET request received for all order statuses.");
        List<OrderStatus> orderStatusList = orderStatusService.getAllOrderStatus();
        return ResponseEntity.ok().body(orderStatusList);    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderStatus> getOrderStatusById(@PathVariable Long id) {
        OrderStatus orderStatus = orderStatusService.getOrderStatusById(id)
                .orElseThrow(() -> new RuntimeException("OrderStatus not found with id: " + id));
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderStatus> createOrderStatus(@RequestBody OrderStatus orderStatus) {
        OrderStatus newOrderStatus = orderStatusService.createOrderStatus(orderStatus);
        return new ResponseEntity<>(newOrderStatus, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderStatus(@PathVariable Long id) {
        orderStatusService.deleteOrderStatus(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}