package com.example.backend.resource;

import com.example.backend.model.AuthenticationRequest;
import com.example.backend.model.RegisterRequest;
import com.example.backend.model.Response;
import com.example.backend.services.implementation.ClientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class authResource
{
    private final ClientServiceImpl clientService;
    private final UserDetailsService userDetailsService;

    @GetMapping("test")
    public  ResponseEntity<Response> test()
    {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("body","working"))
                        .message("test completed")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );

    }
    @PostMapping("/signUp")
    public ResponseEntity<Response> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("token",clientService.register(request)))
                        .message("Client created")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody AuthenticationRequest request)
    {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("token",clientService.authenticate(request),"user",userDetailsService.loadUserByUsername(request.getUsername())))
                        .message("Client logged in")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping("/loadUser")
    public ResponseEntity<Response> loadUser(@RequestHeader("Jwt-Token") String token)
    {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user",clientService.get(token)))
                        .message("Client loaded")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

}
