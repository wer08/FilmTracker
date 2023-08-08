package com.example.backend.services.implementation;

import com.example.backend.model.Client;
import com.example.backend.model.Movie;
import com.example.backend.model.WatchList;
import com.example.backend.repo.WatchListRepository;
import com.example.backend.services.WatchListService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.example.backend.model.WatchListType.*;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class WatchListServiceImpl implements WatchListService {


    private final WatchListRepository repository;
    @Override
    public WatchList getWatchedByClient(Client client) {
        return repository.findByClientAndType(client, WATCHED).orElseGet(WatchList::new);
    }

    @Override
    public WatchList getToWatchByClient(Client client) {
        return repository.findByClientAndType(client, TO_WATCH).orElseGet(WatchList::new);
    }

    @Override
    public WatchList addToWatched(Client client, Movie movie) {
        WatchList watchedList = getWatchedByClient(client);
        watchedList.getMovies().add(movie);
        return repository.save(watchedList);
    }

    @Override
    public WatchList addToWatch(Client client, Movie movie) {
        WatchList toWatchList = getToWatchByClient(client);
        toWatchList.getMovies().add(movie);
        return repository.save(toWatchList);
    }

    @Override
    public WatchList removeFromToWatch(Client client, Movie movie) {
        WatchList toWatchList = getToWatchByClient(client);
        toWatchList.getMovies().remove(movie);
        return repository.save(toWatchList);
    }

    @Override
    public WatchList removeFromWatched(Client client, Movie movie) {
        WatchList wachedList = getWatchedByClient(client);
        wachedList.getMovies().remove(movie);
        return repository.save(wachedList);
    }
}
