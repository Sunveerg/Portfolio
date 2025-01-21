package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import com.example.portfolio.MyselfSubdomain.BusinessLayer.SunveerService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/v1/sunveer")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SunveerController {

    private final SunveerService sunveerService;

    public SunveerController(SunveerService sunveerService) {
        this.sunveerService = sunveerService;
    }

    @GetMapping()
    public Flux<SunveerResponseModel> getAllSunveer() {
        return sunveerService.getAllSunveer();
    }
}
