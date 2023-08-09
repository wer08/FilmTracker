package com.example.backend.services.implementation;

import com.example.backend.configuration.JwtService;
import com.example.backend.model.*;
import com.example.backend.repo.ClientRepo;
import com.example.backend.services.ClientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.backend.model.Role.USER;


@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ClientServiceImpl implements ClientService
{
    private final ClientRepo clientRepo;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    @Override
    public Client get(Long id)
    {
        return clientRepo.findById(id).get();
    }

    @Override
    public List<Client> list()
    {
        return clientRepo.findAll().stream().toList();
    }

    @Override
    public String register(RegisterRequest request)
    {

        Client user = Client.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(USER)
                .username(request.getUsername())
                .build();

        clientRepo.save(user);
        return jwtService.generateToken(user);
    }

    @Override
    public String authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        Client user = clientRepo.findByUsername(request.getUsername())
                .orElseThrow();
        return jwtService.generateToken(user);

    }

    @Override
    public Client get(String token)
    {
        String username = jwtService.extractUsername(token);
        Client client = clientRepo.findByUsername(username).get();

        return client;
    }

    @Override
    public Client update(Client client)
    {
        log.info("Updating item id: {}",client.getId());
        Client clientToUpdate = clientRepo.findById(client.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        BeanUtils.copyProperties(client,clientToUpdate);
        clientToUpdate.setPassword(passwordEncoder.encode(client.getPassword()));

        return clientRepo.save(clientToUpdate);
    }

}
