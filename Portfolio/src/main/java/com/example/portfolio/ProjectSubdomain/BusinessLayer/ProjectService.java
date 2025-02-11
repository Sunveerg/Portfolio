package com.example.portfolio.ProjectSubdomain.BusinessLayer;

import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectService {

    Flux<ProjectResponseModel> getAllProjects();

    Mono<ProjectResponseModel> getProjectByProjectId(String projectId);

    Mono<ProjectResponseModel> addProject(Mono<ProjectRequestModel> projectRequestModel);

    Mono<ProjectResponseModel> updateProject(Mono<ProjectRequestModel> projectRequestModel, String projectId);

    Mono<Void> deleteProject(String projectId);

}
