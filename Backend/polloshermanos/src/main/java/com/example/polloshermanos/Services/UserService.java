package main.java.com.example.polloshermanos.Services;

import main.java.com.example.polloshermanos.Entities.User;
import main.java.com.example.polloshermanos.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()) {
            throw new IllegalStateException("User with id " + id + " does not exist");
        }
        return user;
    }

    public Optional<User> getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()) {
            throw new IllegalStateException("User with email " + email + " does not exist");
        }
        return user;
    }

    public User creatUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalStateException("User with id " + id + " does not exist");
        }
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()) {
            throw new IllegalStateException("User with email " + email + " does not exist");
        }
        return user.get().getPassword().equals(password);
    }
}
