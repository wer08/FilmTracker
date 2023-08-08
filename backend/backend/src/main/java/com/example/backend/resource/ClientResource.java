package com.example.backend.resource;


import com.example.backend.model.Client;
import com.example.backend.model.Movie;
import com.example.backend.model.Response;
import com.example.backend.model.WatchList;
import com.example.backend.services.implementation.ClientServiceImpl;
import com.example.backend.services.implementation.WatchListServiceImpl;
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
    private final WatchListServiceImpl watchListService;

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

    @GetMapping("/get/{id}/watched")
    public ResponseEntity<Response> getUserWatched(@PathVariable("id") Long id) {
        Client client = clientService.get(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        WatchList watchedList = client.getWatched();

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("watchedList", watchedList))
                        .message("Client watchlists retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}/towatch")
    public ResponseEntity<Response> getUserToWatch(@PathVariable("id") Long id) {
        Client client = clientService.get(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        WatchList toWatchList = client.getToWatch();

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("toWatchList", toWatchList))
                        .message("Client watchlists retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/add-to-watch/{userId}")
    public ResponseEntity<Response> addToWatch(@PathVariable("userId") Long userId, @RequestBody Movie movie) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        WatchList toWatchList = watchListService.addToWatch(client, movie);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("toWatchList", toWatchList))
                        .message("Movie added to to-watch list")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/add-to-watched/{userId}")
    public ResponseEntity<Response> addToWatched(@PathVariable("userId") Long userId, @RequestBody Movie movie) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        WatchList watchedList = watchListService.addToWatched(client, movie);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("watchedList", watchedList))
                        .message("Movie added to watched list")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }


    @DeleteMapping("/remove-from-to-watch/{userId}")
    public ResponseEntity<Response> removeFromToWatch(@PathVariable("userId") Long userId, @RequestBody Movie movie) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        WatchList toWatchList = watchListService.removeFromToWatch(client, movie);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("toWatchList", toWatchList))
                        .message("Movie removed from to-watch list")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @DeleteMapping("/remove-from-watched/{userId}")
    public ResponseEntity<Response> removeFromWatched(@PathVariable("userId") Long userId, @RequestBody Movie movie) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        WatchList watchedList = watchListService.removeFromWatched(client, movie);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("watchedList", watchedList))
                        .message("Movie removed from watched list")
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
