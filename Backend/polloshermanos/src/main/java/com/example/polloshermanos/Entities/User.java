package main.java.com.example.polloshermanos.Entities;

import javax.persistence.*;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(unique = true, nullable = false, name = "email")
    private String email;

    @Column(nullable = false, name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "role")
    private RoleType role;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.role = RoleType.CUSTOMER;
    }

    public User(String email, String password, RoleType role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User() {
    }
    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

}
