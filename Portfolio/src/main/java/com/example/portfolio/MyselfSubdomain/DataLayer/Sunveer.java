package com.example.portfolio.MyselfSubdomain.DataLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Sunveer {

    @Id
    private String id;
    private String sunveerId;
    private String skills;
    private String hobbies;
}
