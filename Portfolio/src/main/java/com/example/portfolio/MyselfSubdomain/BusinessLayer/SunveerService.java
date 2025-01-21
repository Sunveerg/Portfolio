package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import reactor.core.publisher.Flux;

public interface SunveerService {
    Flux<SunveerResponseModel> getAllSunveer();

}
