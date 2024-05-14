package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

import main.java.com.example.polloshermanos.Entities.Order;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Payments")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(nullable = false, name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(nullable = false, name = "amount")
    private double amount;

    @Column(nullable = false, name = "card_number")
    private String cardNumber;

    @Column(nullable = false, name = "card_holder_name")
    private String cardHolderName;

    @Column(nullable = false, name = "card_expiry_date")
    private LocalDate cardExpiryDate;

    @Column(nullable = false, name = "card_cvv")
    private String cardCVV;

    public Payment(Order order, LocalDateTime paymentDate, String cardNumber, String cardHolderName, LocalDate cardExpiryDate, String cardCVV) {
        this.order = order;
        this.paymentDate = paymentDate;
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.cardExpiryDate = cardExpiryDate;
        this.cardCVV = cardCVV;
        this.amount = order.getTotalAmount();
    }

    public Payment() {
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
        this.amount = order.getTotalAmount();
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public LocalDate getCardExpiryDate() {
        return cardExpiryDate;
    }

    public void setCardExpiryDate(LocalDate cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    public String getCardCVV() {
        return cardCVV;
    }

    public void setCardCVV(String cardCVV) {
        this.cardCVV = cardCVV;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((paymentId == null) ? 0 : paymentId.hashCode());
        result = prime * result + ((order == null) ? 0 : order.hashCode());
        result = prime * result + ((paymentDate == null) ? 0 : paymentDate.hashCode());
        long temp;
        temp = Double.doubleToLongBits(amount);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((cardNumber == null) ? 0 : cardNumber.hashCode());
        result = prime * result + ((cardHolderName == null) ? 0 : cardHolderName.hashCode());
        result = prime * result + ((cardExpiryDate == null) ? 0 : cardExpiryDate.hashCode());
        result = prime * result + ((cardCVV == null) ? 0 : cardCVV.hashCode());
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
        Payment other = (Payment) obj;
        if (paymentId == null) {
            if (other.paymentId != null)
                return false;
        } else if (!paymentId.equals(other.paymentId))
            return false;
        if (order == null) {
            if (other.order != null)
                return false;
        } else if (!order.equals(other.order))
            return false;
        if (paymentDate == null) {
            if (other.paymentDate != null)
                return false;
        } else if (!paymentDate.equals(other.paymentDate))
            return false;
        if (Double.doubleToLongBits(amount) != Double.doubleToLongBits(other.amount))
            return false;
        if (cardNumber == null) {
            if (other.cardNumber != null)
                return false;
        } else if (!cardNumber.equals(other.cardNumber))
            return false;
        if (cardHolderName == null) {
            if (other.cardHolderName != null)
                return false;
        } else if (!cardHolderName.equals(other.cardHolderName))
            return false;
        if (cardExpiryDate == null) {
            if (other.cardExpiryDate != null)
                return false;
        } else if (!cardExpiryDate.equals(other.cardExpiryDate))
            return false;
        if (cardCVV == null) {
            if (other.cardCVV != null)
                return false;
        } else if (!cardCVV.equals(other.cardCVV))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Payment [paymentId=" + paymentId + ", order=" + order + ", paymentDate=" + paymentDate + ", amount="
                + amount + ", cardNumber=" + cardNumber + ", cardHolderName=" + cardHolderName + ", cardExpiryDate="
                + cardExpiryDate + ", cardCVV=" + cardCVV + "]";
    }

}
