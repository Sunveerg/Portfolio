package com.example.portfolio.utils;

import com.example.portfolio.MyselfSubdomain.DataLayer.Sunveer;
import com.example.portfolio.MyselfSubdomain.DataLayer.SunveerRepo;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.DataLayer.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final SunveerRepo sunveerRepo;
    private final UserRepository userRepo;

    @Override
    public void run(String... args) throws Exception {
        setupSunveer();
        setupUsers();
    }

    private void setupSunveer() {
        Sunveer sunveer1 = buildSunveer("sunveerId1", "Java☕\uFE0F, Spring\uD83C\uDF31, React⚛\uFE0F, Typescript\uD83D\uDD35, Languages\uD83C\uDF0D\uD83D\uDCAC, and more on my CV which you can download!", "Football, Basketball, Video-Games, and coding of course\uD83D\uDCBB.");

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


    private Sunveer buildSunveer(String sunveerId, String skills, String hobbies) {
        return Sunveer.builder()
                .sunveerId(sunveerId)
                .skills(skills)
                .hobbies(hobbies)
                .build();
    }

    private void setupUsers() {
        User user3 = buildUser("userId3", "leopold@example.com", "Leopold", "Miller", List.of("Customer"), null);
        User user4 = buildUser("userId4", "samuel@example.com", "Samuel", "Taylor", List.of("Staff"), null);
        User user5 = buildUser("userId5", "samantha@example.com", "Samantha", "Lee", List.of("Customer"), List.of("read"));
        Flux.just( user3, user4, user5)
                .flatMap(user -> {
                    System.out.println("Checking if user exists: " + user.getUserId());

                    // Check if the user already exists by userId (or email)
                    return userRepo.findByUserId(user.getUserId()) // Assuming userId is the unique identifier
                            .doOnTerminate(() -> System.out.println("Terminated: " + user.getUserId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting user: " + user.getUserId());
                                return userRepo.save(user); // Save if user doesn't exist
                            }));
                })
                .subscribe();
    }


    private User buildUser(String userId, String email, String firstName, String lastName, List<String> roles, List<String> permissions) {
        return User.builder()
                .userId(userId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .roles(roles)
                .permissions(permissions)
                .build();
    }

}
