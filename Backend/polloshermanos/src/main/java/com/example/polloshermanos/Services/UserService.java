package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.User;
import main.java.com.example.polloshermanos.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        logger.info("Fetching all users");
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        logger.info("Fetching user with id {}", id);
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            logger.error("User with id {} not found", id);
            throw new EntityNotFoundException("User with id " + id + " not found");
        }
        return user;
    }

    public Optional<User> getUserByEmail(String email) {
        logger.info("Fetching user with email {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            logger.error("User with email {} not found", email);
            throw new EntityNotFoundException("User with email " + email + " not found");
        }
        return user;
    }

    public User createUser(User user) {
        logger.info("Creating new user with email {}", user.getEmail());
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        logger.info("Deleting user with id {}", id);
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            logger.error("User with id {} not found", id);
            throw new EntityNotFoundException("User with id " + id + " not found");
        }
    }

    public boolean authenticateUser(String email, String password) {
        logger.info("Authenticating user with email {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            logger.error("User with email {} not found", email);
            throw new EntityNotFoundException("User with email " + email + " not found");
        }
        boolean authenticated = user.get().getPassword().equals(password);
        if (authenticated) {
            logger.info("User authenticated successfully with email {}", email);
        } else {
            logger.error("Failed authentication attempt for user with email {}", email);
        }
        return authenticated;
    }
}
