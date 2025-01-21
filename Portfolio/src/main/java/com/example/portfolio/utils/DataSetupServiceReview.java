package com.example.portfolio.utils;

import com.example.portfolio.MyselfSubdomain.DataLayer.Sunveer;
import com.example.portfolio.MyselfSubdomain.DataLayer.SunveerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final SunveerRepo sunveerRepo;

    @Override
    public void run(String... args) throws Exception {
    setupSunveer();
    }

    private void setupSunveer() {
        Sunveer sunveer1 = buildSunveer("sunveerId1", 20, "Indian");

        Flux.just(sunveer1)
                .flatMap(sunveer -> {
                    return sunveerRepo.findSunveerBySunveerId(sunveer.getSunveerId())
                            .doOnTerminate(() -> System.out.println("Terminated: " + sunveer.getSunveerId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting review: " + sunveer.getSunveerId());
                                return sunveerRepo.save(sunveer); // Save if review doesn't exist
                            }));
                })
                .subscribe();
    }


    private Sunveer buildSunveer(String sunveerId, int age, String nationality) {
        return Sunveer.builder()
                .sunveerId(sunveerId)
                .age(age)
                .nationality(nationality)
                .build();
    }


}
