package com.example.portfolio.ProjectSubdomain.BusinessLayer;

import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.DataLayer.ProjectRepository;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService{

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Flux<ProjectResponseModel> getAllProjects() {
        return projectRepository.findAll().map(EntityDTOUtil::toProjectResponseDTO);
    }

    @Override
    public Mono<ProjectResponseModel> getProjectByProjectId(String projectId) {
        return projectRepository.findProjectByProjectId(projectId).map(EntityDTOUtil::toProjectResponseDTO);
    }

    @Override
    public Mono<ProjectResponseModel> addProject(Mono<ProjectRequestModel> projectRequestModel) {
        return projectRequestModel
                .map(EntityDTOUtil::toProjectEntity)
                .flatMap(projectRepository::insert)
                .flatMap(savedProject -> projectRepository.findById(savedProject.getId()))
                .map(EntityDTOUtil::toProjectResponseDTO)
                .doOnSuccess(response -> log.info("Project added successfully with ID: {}", response.getProjectId()));
    }

    @Override
    public Mono<ProjectResponseModel> updateProject(Mono<ProjectRequestModel> projectRequestModel, String projectId) {
        return projectRepository.findProjectByProjectId(projectId)
                .flatMap(existingProject -> projectRequestModel.map(requestModel -> {
                    existingProject.setProjectName(requestModel.getProjectName());
                    existingProject.setProjectDescription(requestModel.getProjectDescription());
                    existingProject.setProjectImage(requestModel.getProjectImage());
                    existingProject.setProjectLink(requestModel.getProjectLink());
                    existingProject.setProjectTeamSize(requestModel.getProjectTeamSize());
                    return existingProject;
                }))
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found with id: " + projectId)))
                .flatMap(projectRepository::save)
                .map(EntityDTOUtil::toProjectResponseDTO);
    }


    @Override
    public Mono<Void> deleteProject(String projectId) {
        return projectRepository.findProjectByProjectId(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found with id: " + projectId)))
                .flatMap(projectRepository::delete);
    }

}
