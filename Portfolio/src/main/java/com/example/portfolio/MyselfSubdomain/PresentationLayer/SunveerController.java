package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import com.example.portfolio.MyselfSubdomain.BusinessLayer.SunveerService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
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

    @PutMapping("/{sunveerId}")
    public Mono<ResponseEntity<SunveerResponseModel>> updateSunveer(@RequestBody Mono<SunveerRequestModel> sunveerRequestModel, @PathVariable String sunveerId) {
        return sunveerService.updateSunveer(sunveerRequestModel, sunveerId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
