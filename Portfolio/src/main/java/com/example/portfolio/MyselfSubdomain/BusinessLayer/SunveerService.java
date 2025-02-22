package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SunveerService {
    Flux<SunveerResponseModel> getAllSunveer();

    Mono<SunveerResponseModel> updateSunveer(Mono<SunveerRequestModel> sunveerRequestModel, String sunveerId);

}
