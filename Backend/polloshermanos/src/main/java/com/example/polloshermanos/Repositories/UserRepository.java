package main.java.com.example.polloshermanos.Repositories;

import main.java.com.example.polloshermanos.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = : email")
    Optional<User> findByEmailCustomQuery(@Param("email") String email);
}
