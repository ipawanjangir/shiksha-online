package com.online.shiksha.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.online.shiksha.model.User;
import com.online.shiksha.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Taaki local server se data block na ho
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Form data save karne ke liye
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        userRepository.save(user);
        return "Student registered successfully!";
    }

    // Admin Panel mein saare students dikhane ke liye
    @GetMapping("/students")
    public List<User> getAllStudents() {
        return userRepository.findAll();
    }
}