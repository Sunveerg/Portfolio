package com.example.portfolio.utils;


import com.example.portfolio.CommentSubdomain.DataLayer.Comment;
import com.example.portfolio.CommentSubdomain.PresentationLayer.CommentRequestModel;
import com.example.portfolio.CommentSubdomain.PresentationLayer.CommentResponseModel;
import com.example.portfolio.MyselfSubdomain.DataLayer.Quotes;
import com.example.portfolio.MyselfSubdomain.DataLayer.Sunveer;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.QuotesRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.QuotesResponseModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.PresentationLayer.UserResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class EntityDTOUtil {

    public static List<QuotesResponseModel> toQuotesResponseDTO(List<Quotes> quotesList) {
        return quotesList.stream()
                .map(details -> QuotesResponseModel.builder()
                        .quote(details.getQuote())
                        .author(details.getAuthor())
                        .build())
                .toList();
    }

    public static Quotes toQuotesEntity(QuotesRequestModel requestModel) {
        Quotes quotes = new Quotes();
        quotes.setQuote(requestModel.getQuote());
        quotes.setAuthor(requestModel.getAuthor());
        return quotes;
    }

    public static SunveerResponseModel toSunveerResponseDTO(Sunveer sunveer) {
        SunveerResponseModel sunveerResponseModel = new SunveerResponseModel();
        sunveerResponseModel.setSunveerId(sunveer.getSunveerId());
        sunveerResponseModel.setSkills(sunveer.getSkills());
        sunveerResponseModel.setHobbies(sunveer.getHobbies());
        sunveerResponseModel.setDescription(sunveer.getDescription());
        sunveerResponseModel.setQuotesList(toQuotesResponseDTO(sunveer.getQuotesList()));

        return sunveerResponseModel;
    }

    public static UserResponseModel toUserResponseModel(User user) {
        UserResponseModel model = new UserResponseModel();
        model.setUserId(user.getUserId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setLastName(user.getLastName());
        model.setRoles(user.getRoles());
        model.setPermissions(user.getPermissions());
        return model;
    }

    public static ProjectResponseModel toProjectResponseDTO(Project project) {
        ProjectResponseModel projectResponseModel = new ProjectResponseModel();
        BeanUtils.copyProperties(project, projectResponseModel);
        return projectResponseModel;
    }

    public static Project toProjectEntity(ProjectRequestModel projectRequestModel) {
        return Project.builder()
                .projectId(generateProjectIdString())
                .projectName(projectRequestModel.getProjectName())
                .projectDescription(projectRequestModel.getProjectDescription())
                .projectLink(projectRequestModel.getProjectLink())
                .projectImage(projectRequestModel.getProjectImage())
                .projectTeamSize(projectRequestModel.getProjectTeamSize())
                .build();
    }

    private static String generateProjectIdString() {
        return UUID.randomUUID().toString();
    }

    public static CommentResponseModel toCommentResponseDTO(Comment comment) {
        CommentResponseModel commentResponseModel = new CommentResponseModel();
        BeanUtils.copyProperties(comment, commentResponseModel);
        return commentResponseModel;
    }

    public static Comment toCommentEntity(CommentRequestModel commentRequestModel) {
        return Comment.builder()
                .commentId(generateCommentIdString())
                .author(commentRequestModel.getAuthor())
                .date(commentRequestModel.getDate())
                .comment(commentRequestModel.getComment())
                .isApproved(commentRequestModel.isApproved())
                .build();
    }

    private static String generateCommentIdString() {
        return UUID.randomUUID().toString();
    }

}
