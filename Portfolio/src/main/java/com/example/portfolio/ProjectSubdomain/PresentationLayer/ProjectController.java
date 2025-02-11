package com.example.portfolio.ProjectSubdomain.PresentationLayer;

import com.example.portfolio.ProjectSubdomain.BusinessLayer.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/projects")
@Validated
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowedHeaders = "content-Type", allowCredentials = "true")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping(value = "")
    public Flux<ProjectResponseModel> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping(value = "/{projectId}")
    public Mono<ResponseEntity<ProjectResponseModel>> getProjectByProjectId(@PathVariable String projectId) {
        return projectService.getProjectByProjectId(projectId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{projectId}")
    public Mono<ResponseEntity<ProjectResponseModel>> updateProject(@RequestBody Mono<ProjectRequestModel> projectRequestModel, @PathVariable String projectId) {
        return projectService.updateProject(projectRequestModel, projectId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public Mono<ResponseEntity<ProjectResponseModel>> addProject(@RequestBody Mono<ProjectRequestModel> projectRequestModel) {
        return projectService.addProject(projectRequestModel)
                .map(response -> ResponseEntity.status(HttpStatus.CREATED).body(response));
    }

    @DeleteMapping("/{projectId}")
    public Mono<ResponseEntity<Void>> deleteProject(@PathVariable String projectId) {
        return projectService.deleteProject(projectId)
                .then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)))
                .onErrorResume(e -> Mono.just(new ResponseEntity<Void>(HttpStatus.NOT_FOUND)));
    }
}
