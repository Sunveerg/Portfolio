package com.example.portfolio.ProjectSubdomain.PresentationLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseModel {

    private String projectId;
    private String projectName;
    private String projectDescription;
    private String projectLink;
    private String projectImage;
    private int projectTeamSize;

}
