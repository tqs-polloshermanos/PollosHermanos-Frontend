package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

@Entity
@Table(name = "OrderDetails")
public class OrderDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_id")
    private Long orderDetailId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(nullable = false, name = "order_id")
    private Order order;

    @Column(nullable = false, name = "quantity")
    private int quantity;

    @Column(nullable = false, name = "price")
    private double price;

    public OrderDetail(Product product, Order order, int quantity) {
        this.product = product;
        this.order = order;
        this.quantity = quantity;
        this.price = calculatePrice();
    }

    public OrderDetail() {
    }

    public Long getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(Long orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.price = calculatePrice();
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    private double calculatePrice() {
        return this.product.getPrice() * this.quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((orderDetailId == null) ? 0 : orderDetailId.hashCode());
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        result = prime * result + ((order == null) ? 0 : order.hashCode());
        result = prime * result + quantity;
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
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
        OrderDetail other = (OrderDetail) obj;
        if (orderDetailId == null) {
            if (other.orderDetailId != null)
                return false;
        } else if (!orderDetailId.equals(other.orderDetailId))
            return false;
        if (product == null) {
            if (other.product != null)
                return false;
        } else if (!product.equals(other.product))
            return false;
        if (order == null) {
            if (other.order != null)
                return false;
        } else if (!order.equals(other.order))
            return false;
        if (quantity != other.quantity)
            return false;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "OrderDetail [orderDetailId=" + orderDetailId + ", product=" + product + ", order=" + order
                + ", quantity=" + quantity + ", price=" + price + "]";
    }
}
