package com.example.backend.repo;

import com.example.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepo extends JpaRepository<Client,Long>
{
    Optional<Client> findByUsername(String username);
    Optional<Client> findByEmail(String email);
}
