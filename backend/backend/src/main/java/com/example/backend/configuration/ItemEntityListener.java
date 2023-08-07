package com.example.backend.configuration;

import com.example.backend.model.Movie;
import jakarta.persistence.PrePersist;

import java.util.Date;

public class ItemEntityListener
{
    @PrePersist
    public void prePersist(Movie movie) {
        if (movie.getDate() == null) {
            movie.setDate(new Date());
        }
    }
}
