package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SunveerResponseModel {

    String sunveerId;
    String skills;
    String hobbies;
    String description;
    List<QuotesResponseModel> quotesList;

}
