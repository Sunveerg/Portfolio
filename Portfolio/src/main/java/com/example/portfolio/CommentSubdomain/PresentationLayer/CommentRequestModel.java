package com.example.portfolio.CommentSubdomain.PresentationLayer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestModel {

    private String author;
    private LocalDate date;
    private String comment;

    @JsonProperty("isApproved")
    private boolean isApproved;

}
