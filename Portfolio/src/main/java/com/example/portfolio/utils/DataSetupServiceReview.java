package com.example.portfolio.utils;

import com.example.portfolio.CommentSubdomain.DataLayer.Comment;
import com.example.portfolio.CommentSubdomain.DataLayer.CommentRepository;
import com.example.portfolio.MyselfSubdomain.DataLayer.Sunveer;
import com.example.portfolio.MyselfSubdomain.DataLayer.SunveerRepo;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.DataLayer.ProjectRepository;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.DataLayer.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final SunveerRepo sunveerRepo;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepository;
    private final CommentRepository commentRepository;

    @Override
    public void run(String... args) throws Exception {
        setupSunveer();
        setupUsers();
        setupProjects();
        setUpComments();
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
        User user1 = buildUser(
                "auth0|67a0f1bdb6215a7f72e12a88",
                "2230087@champlaincollege.qc.ca",
                "Admin",
                "User",
                List.of("Admin"),
                List.of("read:admin-messages",
                        "read:current_user",
                        "read:customer",
                        "read:roles",
                        "read:users",
                        "write:role"));

        User user2 = buildUser(
                "auth0|67a0f1ef538a8d0743e4aa64",
                "sunveerghum@hotmail.com",
                "Sunveer",
                "Ghumman",
                List.of("User"),
                List.of("read:users"));

        Flux.just(user1, user2)
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

    private void setupProjects() {
        Project project1 = buildProject(
                "project1",
                "Champlain Pet Clinic \uD83E\uDE7A\uD83D\uDC3E\uD83C\uDFE5",
                "This is a project for the students at Champlain College Saint-Lambert." +
                        " The project is to create a web application for a pet clinic." +
                        " It consists of a API-Gateway and multi-service application like billing, cart, customer, inventory, and more." +
                        " It includes many different languages, libraries, and frameworks." +
                        " During my time working on this project, I was assigned the inventory service in which I completed many full-stack and half-stack stories.",
                "https://github.com/cgerard321/champlain_petclinic",
                "https://i.postimg.cc/7ZhDPPPB/376005983-7fa53d54-5405-48c1-b811-0b0eb3100346.png",
                6);

        Project project2 = buildProject(
                "project2",
                "Noodle Star \uD83C\uDF1F",
                "This is a project created for a chinese restaurant in Montreal called Noodle Star." +
                        " We are designing a full-stack web application from scratch where we include a place to view the menu, place orders, leave reviews, access your account, etc." +
                        " The project includes a React front-end, Spring Boot back-end, and a MongoDB database.",
                "https://github.com/Sunveerg/Noodle-Star",
                "https://i.postimg.cc/yd9xsmXX/noodlestar.png",
                4);

        Project project3 = buildProject(
                "project3",
                "Turret Game \uD83D\uDEE1\uFE0F⚔\uFE0F",
                "This is a game created in Unity where you fight to defend your tower from the other player." +
                        " It is a local 1v1 game which includes many Unity features like animations, physics, and more." +
                        " The players have to eliminate the other person and destroy their tower which also attacks them." +
                        " They can use abilities to help them." ,
                "https://github.com/Sunveerg/Turret-Game",
                "https://i.postimg.cc/T11d7BYw/turret.png",
                2);

        Flux.just(project1, project2, project3)
                .flatMap(project -> {
                    System.out.println("Checking if project exists: " + project.getProjectId());

                    return projectRepository.findProjectByProjectId(project.getProjectId()) // Assuming userId is the unique identifier
                            .doOnTerminate(() -> System.out.println("Terminated: " + project.getProjectId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting user: " + project.getProjectId());
                                return projectRepository.save(project);
                            }));
                })
                .subscribe();
    }

    private Project buildProject(String projectId, String projectName, String projectDescription, String projectLink, String projectImage, int projectTeamSize) {
        return Project.builder()
                .projectId(projectId)
                .projectName(projectName)
                .projectDescription(projectDescription)
                .projectLink(projectLink)
                .projectImage(projectImage)
                .projectTeamSize(projectTeamSize)
                .build();
    }

    private void setUpComments(){
        Comment comment1 = buildComment("comment1", "Haitham Nabihi", LocalDate.now(), "Great work on the project!");
        Comment comment2 = buildComment("comment2", "Zakaria Boudboub", LocalDate.now(), "I love the project!");
        Comment comment3 = buildComment("comment3", "Felix Zhang", LocalDate.now(), "Keep up the good work!");

        Flux.just(comment1, comment2, comment3)
                .flatMap(comment -> {
                    System.out.println("Checking if comment exists: " + comment.getCommentId());

                    return commentRepository.findCommentByCommentId(comment.getCommentId())
                            .doOnTerminate(() -> System.out.println("Terminated: " + comment.getCommentId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting comment: " + comment.getCommentId());
                                return commentRepository.save(comment);
                            }));
                })
                .subscribe();
    }

    private Comment buildComment(String commentId, String author, LocalDate date, String comment) {
        return Comment.builder()
                .commentId(commentId)
                .author(author)
                .date(date)
                .comment(comment)
                .isApproved(false)
                .build();
    }

}
