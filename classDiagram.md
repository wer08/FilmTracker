@startuml

class Response {
    - timeStamp: LocalDateTime
    - data: Map<String, Object>
    - message: String
    - status: HttpStatus
    - statusCode: int
    + getters/setters
}

class Client {
    - id: Long
    - username: String
    - email: String
    - firstName: String
    - lastName: String
    - password: String
    - toWatch: List<String>
    - watched: List<String>
    - role: Role
    + getters/setters
}

class MovieRequest {
    - id: String
    + getters/setters
}

enum Role {
    ADMIN
    USER
}

class ClientServiceImpl {
    + get(id: Long): Client
    + list(): List<Client>
    + update(client: Client): Client
}

class ClientResource {
    - clientService: ClientServiceImpl
    + getUser(id: Long): ResponseEntity<Response>
    + getUsers(): ResponseEntity<Response>
    + getUserWatched(id: Long): ResponseEntity<Response>
    + getUserToWatch(id: Long): ResponseEntity<Response>
    + addToWatch(userId: Long, request: MovieRequest): ResponseEntity<Response>
    + addToWatched(userId: Long, request: MovieRequest): ResponseEntity<Response>
    + removeFromToWatch(userId: Long, movieId: String): ResponseEntity<Response>
    + removeFromWatched(userId: Long, movieId: String): ResponseEntity<Response>
    + updateUser(client: Client): ResponseEntity<Response>
}

ClientResource --> ClientServiceImpl
ClientResource --> Response
ClientServiceImpl --> Client
Client --> Role
Client --> MovieRequest

@enduml
