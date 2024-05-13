package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.OrderStatus;
import main.java.com.example.polloshermanos.Repositories.OrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusService {

    private final OrderStatusRepository orderStatusRepository;

    @Autowired
    public OrderStatusService(OrderStatusRepository orderStatusRepository) {
        this.orderStatusRepository = orderStatusRepository;
    }

    public List<OrderStatus> getAllOrderStatus() {
        return orderStatusRepository.findAll();
    }

    public Optional<OrderStatus> getOrderStatusById(Long id) {
        return orderStatusRepository.findById(id);
    }

    public OrderStatus createOrderStatus(OrderStatus orderStatus) {
        return orderStatusRepository.save(orderStatus);
    }

    public void deleteOrderStatus(Long id) {
        orderStatusRepository.deleteById(id);
    }
}
