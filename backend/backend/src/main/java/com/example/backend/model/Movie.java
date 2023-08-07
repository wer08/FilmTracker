package com.example.backend.model;


import com.example.backend.configuration.ItemEntityListener;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(ItemEntityListener.class)
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
