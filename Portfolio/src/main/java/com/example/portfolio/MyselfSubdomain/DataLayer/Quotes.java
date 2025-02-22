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
public class Quotes {

    @Id
    private String id;
    private String quote;
    private String author;

}
