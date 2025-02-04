package com.example.portfolio.auth0;

import com.example.portfolio.UserSubdomain.PresentationLayer.UserResponseModel;
import reactor.core.publisher.Mono;

public interface Auth0Service {

    Mono<UserResponseModel> getUserById(String auth0UserId);
    Mono<Void> assignRoleToUser(String auth0UserId, String roleName);
}
