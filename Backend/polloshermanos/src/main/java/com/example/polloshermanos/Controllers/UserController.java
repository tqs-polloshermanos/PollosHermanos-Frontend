package main.java.com.example.polloshermanos.Controllers;

import main.java.com.example.polloshermanos.Entities.User;
import main.java.com.example.polloshermanos.Services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        logger.info("GET request received for all users.");
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        logger.info("GET request received for user with ID: {}", id);
        User user = userService.getUserById(id)
                    .orElseThrow(() -> {
                        logger.warn("User not found with ID: {}", id);
                        return new RuntimeException("User not found with id: " + id);
                    });
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        logger.info("GET request received for user with email: {}", email);
        User user = userService.getUserByEmail(email)
                    .orElseThrow(() -> {
                        logger.warn("User not found with email: {}", email);
                        return new RuntimeException("User not found with email: " + email);
                    });
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        logger.info("POST request received to create a new user.");
        User newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        logger.info("DELETE request received to delete user with ID: {}", id);
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Boolean> authenticateUser(@RequestBody User user) {
        logger.info("POST request received for user authentication.");
        boolean authenticated = userService.authenticateUser(user.getEmail(), user.getPassword());
        if(authenticated) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
    }
}
