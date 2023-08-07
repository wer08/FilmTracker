package com.example.backend.resource;


import com.example.backend.model.Client;
import com.example.backend.model.Response;
import com.example.backend.services.implementation.ClientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ClientResource
{
    private final ClientServiceImpl clientService;

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getUser(@PathVariable("id") Long id){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user",clientService.get(id)))
                        .message("Client retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getUsers(){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("users",clientService.list()))
                        .message("Clients retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PutMapping("/update")
    public ResponseEntity<Response> updateUser(@RequestBody Client client){
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user",clientService.update(client)))
                        .message("Client updated")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
