package com.example.backend.services;

import com.example.backend.model.Client;
import com.example.backend.model.Movie;
import com.example.backend.model.WatchList;

public interface WatchListService {
    WatchList getWatchedByClient(Client client);
    WatchList getToWatchByClient(Client client);
    WatchList addToWatched(Client client, Movie movie);
    WatchList addToWatch(Client client, Movie movie);
    WatchList removeFromToWatch(Client client, Movie movie);
    WatchList removeFromWatched(Client client, Movie movie);
}
