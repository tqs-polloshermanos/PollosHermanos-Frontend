package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
    
}
