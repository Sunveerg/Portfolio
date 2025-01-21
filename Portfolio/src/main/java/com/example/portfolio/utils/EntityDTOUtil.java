package com.example.portfolio.utils;


import com.example.portfolio.MyselfSubdomain.DataLayer.Sunveer;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class EntityDTOUtil {


    public static SunveerResponseModel toSunveerResponseDTO(Sunveer sunveer) {
        SunveerResponseModel sunveerResponseModel = new SunveerResponseModel();
        BeanUtils.copyProperties(sunveer, sunveerResponseModel);
        return sunveerResponseModel;
    }

    public static String generateOrderIdString() {
        return UUID.randomUUID().toString();
    }
}
