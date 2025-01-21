package com.example.portfolio.MyselfSubdomain.BusinessLayer;

import com.example.portfolio.MyselfSubdomain.DataLayer.SunveerRepo;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

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
}
