package com.example.backend;

import com.example.backend.configuration.JwtService;
import com.example.backend.model.Client;
import com.example.backend.repo.ClientRepo;
import com.example.backend.services.implementation.ClientServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class ClientServiceTests {

    @InjectMocks
    private ClientServiceImpl clientService;

    @Mock
    private ClientRepo clientRepo;

    @Mock
    private JwtService jwtService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetClientById() {
        Long clientId = 1L;
        Client expectedClient = new Client();
        when(clientRepo.findById(clientId)).thenReturn(Optional.of(expectedClient));

        Client actualClient = clientService.get(clientId);

        assertEquals(expectedClient, actualClient);
    }

    @Test
    public void testListClients() {
        List<Client> expectedClients = new ArrayList<>();
        when(clientRepo.findAll()).thenReturn(expectedClients);

        List<Client> actualClients = clientService.list();

        assertEquals(expectedClients, actualClients);
    }

}
