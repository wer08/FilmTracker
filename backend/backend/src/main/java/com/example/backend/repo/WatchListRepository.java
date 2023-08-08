package com.example.backend.repo;
import com.example.backend.model.Client;
import com.example.backend.model.WatchList;
import com.example.backend.model.WatchListType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WatchListRepository extends JpaRepository<WatchList,Long> {
    Optional<WatchList> findByClientAndType(Client client, WatchListType type);
}
