package com.example.backend.resource;


import com.example.backend.model.Client;
import com.example.backend.model.MovieRequest;
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

    @GetMapping("/get/{id}/watched")
    public ResponseEntity<Response> getUserWatched(@PathVariable("id") Long id) {
        Client client = clientService.get(id);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }


        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("watchedList", client.getWatched()))
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

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("toWatchList", client.getToWatch()))
                        .message("Client watchlists retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/add-to-watch/{userId}")
    public ResponseEntity<Response> addToWatch(@PathVariable("userId") Long userId, @RequestBody MovieRequest request) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        client.getToWatch().add(request.getId());
        clientService.update(client);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("toWatchList", client.getToWatch()))
                        .message("Movie added to to-watch list")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/add-to-watched/{userId}")
    public ResponseEntity<Response> addToWatched(@PathVariable("userId") Long userId, @RequestBody MovieRequest request) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        client.getWatched().add(request.getId());
        clientService.update(client);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("watchedList", client.getWatched()))
                        .message("Movie added to watched list")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }


    @DeleteMapping("/remove-from-to-watch/{movieId}/{userId}")
    public ResponseEntity<Response> removeFromToWatch(@PathVariable("userId") Long userId, @PathVariable("movieId") String movieId) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        client.getToWatch().remove(movieId);
        clientService.update(client);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("toWatchList", client.getToWatch()))
                        .message("Movie removed from to-watch list")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @DeleteMapping("/remove-from-watched/{movieId}/{userId}")
    public ResponseEntity<Response> removeFromWatched(@PathVariable("userId") Long userId, @PathVariable("movieId") String movieId ) {
        Client client = clientService.get(userId);
        if (client == null) {
            return ResponseEntity.notFound().build();
        }
        client.getWatched().remove(movieId);
        clientService.update(client);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("watchedList", client.getWatched()))
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
