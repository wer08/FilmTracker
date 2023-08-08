package com.example.backend;

import com.example.backend.model.Client;
import com.example.backend.model.Movie;
import com.example.backend.model.WatchList;
import com.example.backend.model.WatchListType;
import com.example.backend.repo.WatchListRepository;
import com.example.backend.services.WatchListService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class WatchListServiceTests {

    @InjectMocks
    private WatchListService watchListService;

    @Mock
    private WatchListRepository watchListRepository;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddToWatch() {
        Client client = new Client();
        Movie movie = new Movie();
        WatchList watchList = new WatchList();
        when(watchListRepository.findByClientAndType(client, WatchListType.TO_WATCH))
                .thenReturn(Optional.of(watchList));

        WatchList updatedWatchList = watchListService.addToWatch(client, movie);

        assertTrue(updatedWatchList.getMovies().contains(movie));
    }

    @Test
    public void testRemoveFromToWatch() {
        Client client = new Client();
        Movie movie = new Movie();
        WatchList watchList = new WatchList();
        watchList.getMovies().add(movie);
        when(watchListRepository.findByClientAndType(client, WatchListType.TO_WATCH))
                .thenReturn(Optional.of(watchList));

        WatchList updatedWatchList = watchListService.removeFromToWatch(client, movie);

        assertFalse(updatedWatchList.getMovies().contains(movie));
    }
}
