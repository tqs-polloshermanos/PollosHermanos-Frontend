package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "OrderStatus")
public class OrderStatus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderStatusId;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Long orderId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private LocalDateTime statusDate;

    public Long getOrderStatusId() {
        return orderStatusId;
    }

    public void setOrderStatusId(Long orderStatusId) {
        this.orderStatusId = orderStatusId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(LocalDateTime statusDate) {
        this.statusDate = statusDate;
    }
}
