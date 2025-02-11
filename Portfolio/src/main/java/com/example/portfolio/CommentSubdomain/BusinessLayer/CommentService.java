package com.example.portfolio.CommentSubdomain.BusinessLayer;

import com.example.portfolio.CommentSubdomain.PresentationLayer.CommentRequestModel;
import com.example.portfolio.CommentSubdomain.PresentationLayer.CommentResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CommentService {

    Flux<CommentResponseModel> getAllComments();

    Mono<CommentResponseModel> getCommentByCommentId(String commentId);

    Mono<CommentResponseModel> addComment(Mono<CommentRequestModel> commentRequestModel);

    Mono<CommentResponseModel> updateComment(Mono<CommentRequestModel> commentRequestModel, String commentId);

    Mono<Void> deleteComment(String commentId);

    Mono<Void> approveComment(String commentId);

    Flux<CommentResponseModel> getAllApprovedComments();

    Flux<CommentResponseModel> getAllUnapprovedComments();

}
