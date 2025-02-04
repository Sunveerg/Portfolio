package com.example.portfolio.utils;


import com.example.portfolio.MyselfSubdomain.DataLayer.Sunveer;
import com.example.portfolio.MyselfSubdomain.PresentationLayer.SunveerResponseModel;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.PresentationLayer.UserResponseModel;
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

    public static UserResponseModel toUserResponseModel(User user) {
        UserResponseModel model = new UserResponseModel();
        model.setUserId(user.getUserId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setLastName(user.getLastName());
        model.setRoles(user.getRoles());
        model.setPermissions(user.getPermissions());
        return model;
    }

    public static String generateOrderIdString() {
        return UUID.randomUUID().toString();
    }
}
