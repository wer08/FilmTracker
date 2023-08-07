package com.example.backend.services;

import com.example.backend.model.AuthenticationRequest;
import com.example.backend.model.Client;
import com.example.backend.model.RegisterRequest;

import java.util.List;

public interface ClientService
{
    Client get(Long id);
    List<Client> list();

    String register(RegisterRequest request);

    String authenticate(AuthenticationRequest request);

    Client get(String token);

    Client update(Client client);

}
