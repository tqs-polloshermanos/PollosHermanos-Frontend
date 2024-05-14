package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.Payment;
import main.java.com.example.polloshermanos.Services.PaymentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        logger.info("GET request received for all payments.");
        List<Payment> payments = paymentService.getAllPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        logger.info("GET request received for payment with ID: {}", id);
        Payment payment = paymentService.getPaymentById(id)
                .orElseThrow(() -> {
                    logger.warn("Payment not found with ID: {}", id);
                    return new RuntimeException("Payment not found with id: " + id);
                });
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        logger.info("POST request received to create a new payment.");
        Payment newPayment = paymentService.createPayment(payment);
        return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        logger.info("DELETE request received to delete payment with ID: {}", id);
        paymentService.deletePayment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
