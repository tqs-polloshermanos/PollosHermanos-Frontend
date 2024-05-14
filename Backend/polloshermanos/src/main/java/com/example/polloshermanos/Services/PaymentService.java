package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.Payment;
import main.java.com.example.polloshermanos.Repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        logger.info("Fetching all payments");
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        logger.info("Fetching payment with id {}", id);
        return paymentRepository.findById(id);
    }

    public Payment createPayment(Payment payment) {
        logger.info("Creating new payment with amount {}", payment.getAmount());
        return paymentRepository.save(payment);
    }

    @Transactional
    public void deletePayment(Long id) {
        logger.info("Deleting payment with id {}", id);
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
        } else {
            logger.error("Payment with id {} not found", id);
            throw new EntityNotFoundException("Payment with id " + id + " not found");
        }
    }
}
