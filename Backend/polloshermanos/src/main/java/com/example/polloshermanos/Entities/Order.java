package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

import main.java.com.example.polloshermanos.Entities.Restaurant;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetail;

    @Column(nullable = false, name = "order_date")
    private LocalDateTime orderDate;

    @Column(nullable = false, name = "total_amount")
    private double totalAmount;
    
    @Column(name = "number_of_order")
    private int numberOfOrder;

    public Order(User user, Restaurant restaurant, List<OrderDetail> orderDetail, LocalDateTime orderDate) {
        this.user = user;
        this.restaurant = restaurant;
        this.orderDetail = orderDetail;
        this.orderDate = orderDate;
        this.totalAmount = calculateTotalAmount(orderDetail);
        this.numberOfOrder = restaurant.getNumberOfOrders();
    }

    public Order() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<OrderDetail> getOrderDetail() {
        return orderDetail;
    }

    public void setOrderDetail(List<OrderDetail> orderDetail) {
        this.orderDetail = orderDetail;
        this.totalAmount = calculateTotalAmount(orderDetail);
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getNumberOfOrder() {
        return numberOfOrder;
    }

    public void setNumberOfOrder(int numberOfOrder) {
        this.numberOfOrder = numberOfOrder;
    }
    
    private double calculateTotalAmount(List<OrderDetail> orderDetails) {
        if(orderDetails == null){
            return 0;
        }
        return orderDetails.stream().mapToDouble(OrderDetail::getPrice).sum();
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((orderId == null) ? 0 : orderId.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
        result = prime * result + ((restaurant == null) ? 0 : restaurant.hashCode());
        result = prime * result + ((orderDetail == null) ? 0 : orderDetail.hashCode());
        result = prime * result + ((orderDate == null) ? 0 : orderDate.hashCode());
        long temp;
        temp = Double.doubleToLongBits(totalAmount);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + numberOfOrder;
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
        Order other = (Order) obj;
        if (orderId == null) {
            if (other.orderId != null)
                return false;
        } else if (!orderId.equals(other.orderId))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        if (restaurant == null) {
            if (other.restaurant != null)
                return false;
        } else if (!restaurant.equals(other.restaurant))
            return false;
        if (orderDetail == null) {
            if (other.orderDetail != null)
                return false;
        } else if (!orderDetail.equals(other.orderDetail))
            return false;
        if (orderDate == null) {
            if (other.orderDate != null)
                return false;
        } else if (!orderDate.equals(other.orderDate))
            return false;
        if (Double.doubleToLongBits(totalAmount) != Double.doubleToLongBits(other.totalAmount))
            return false;
        if (numberOfOrder != other.numberOfOrder)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Order [orderId=" + orderId + ", user=" + user + ", restaurant=" + restaurant + ", orderDetail="
                + orderDetail + ", orderDate=" + orderDate + ", totalAmount=" + totalAmount + ", numberOfOrder="
                + numberOfOrder + "]";
    }
}
