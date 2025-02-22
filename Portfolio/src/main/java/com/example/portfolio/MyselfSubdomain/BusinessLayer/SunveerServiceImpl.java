package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.DataLayer.SunveerRepo;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerRequestModel;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectRequestModel;
import com.example.portfolio.ProjectSubdomain.PresentationLayer.ProjectResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class SunveerServiceImpl implements SunveerService {

    private final SunveerRepo sunveerRepo;

    public SunveerServiceImpl(SunveerRepo sunveerRepo) {
        this.sunveerRepo = sunveerRepo;
    }

    @Override
    public Flux<SunveerResponseModel> getAllSunveer() {
        return sunveerRepo.findAll().map(EntityDTOUtil::toSunveerResponseDTO);
    }

    @Override
    public Mono<SunveerResponseModel> updateSunveer(Mono<SunveerRequestModel> sunveerRequestModel, String sunveerId) {
        return sunveerRepo.findSunveerBySunveerId(sunveerId)
                .flatMap(existingSunveer -> sunveerRequestModel.map(requestModel -> {
                    existingSunveer.setSkills(requestModel.getSkills());
                    existingSunveer.setHobbies(requestModel.getHobbies());
                    existingSunveer.setDescription(requestModel.getDescription());
                    existingSunveer.setQuotesList(
                            requestModel.getQuotesList().stream()
                                    .map(EntityDTOUtil::toQuotesEntity)
                                    .toList()
                    );
                    return existingSunveer;
                }))
                .switchIfEmpty(Mono.error(new NotFoundException("Sunveer not found with id: " + sunveerId)))
                .flatMap(sunveerRepo::save)
                .map(EntityDTOUtil::toSunveerResponseDTO);
    }
}
