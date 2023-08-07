package com.example.backend.model;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest
{
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;

}
