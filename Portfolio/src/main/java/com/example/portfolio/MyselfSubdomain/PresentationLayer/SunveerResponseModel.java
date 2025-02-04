package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SunveerResponseModel {
    String sunveerId;
    String skills;
    String hobbies;
}
