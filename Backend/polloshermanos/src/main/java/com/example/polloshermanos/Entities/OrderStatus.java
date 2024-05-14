package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "OrderStatus")
public class OrderStatus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_status_id")
    private Long orderStatusId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "status")
    private Status status;

    @Column(nullable = false, name = "status_date")
    private LocalDateTime statusDate;

    public OrderStatus(Order order, Status status, LocalDateTime statusDate) {
        this.order = order;
        this.status = status;
        this.statusDate = statusDate;
    }

    public OrderStatus() {
    }

    public Long getOrderStatusId() {
        return orderStatusId;
    }

    public void setOrderStatusId(Long orderStatusId) {
        this.orderStatusId = orderStatusId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((orderStatusId == null) ? 0 : orderStatusId.hashCode());
        result = prime * result + ((order == null) ? 0 : order.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((statusDate == null) ? 0 : statusDate.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        OrderStatus other = (OrderStatus) obj;
        if (orderStatusId == null) {
            if (other.orderStatusId != null)
                return false;
        } else if (!orderStatusId.equals(other.orderStatusId))
            return false;
        if (order == null) {
            if (other.order != null)
                return false;
        } else if (!order.equals(other.order))
            return false;
        if (status != other.status)
            return false;
        if (statusDate == null) {
            if (other.statusDate != null)
                return false;
        } else if (!statusDate.equals(other.statusDate))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "OrderStatus [orderStatusId=" + orderStatusId + ", order=" + order + ", status=" + status
                + ", statusDate=" + statusDate + "]";
    }

}
