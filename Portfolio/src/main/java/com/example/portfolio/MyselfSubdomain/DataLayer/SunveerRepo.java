package com.example.portfolio.MyselfSubdomain.DataLayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SunveerRepo extends ReactiveMongoRepository<Sunveer, String> {

    Mono<Sunveer> findSunveerBySunveerId(String sunveerId);

}
