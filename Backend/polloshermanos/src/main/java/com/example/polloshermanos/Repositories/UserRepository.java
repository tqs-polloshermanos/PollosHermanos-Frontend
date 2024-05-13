package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
}
