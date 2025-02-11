package com.example.portfolio.ProjectSubdomain.DataLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Project {

    @Id
    private String id;

    private String projectId;
    private String projectName;
    private String projectDescription;
    private String projectLink;
    private String projectImage;
    private int projectTeamSize;

}
