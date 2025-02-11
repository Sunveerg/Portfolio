package com.example.portfolio.CommentSubdomain.DataLayer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    private String id;

    private String commentId;
    private String author;
    private LocalDate date;
    private String comment;

    @JsonProperty("isApproved")
    private boolean isApproved;

}
