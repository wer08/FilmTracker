package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie
{

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String title;
    private String primaryImage;
    @ManyToOne(fetch = EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"movies","authorities"})
    private Client client;
}
