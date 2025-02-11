package com.example.portfolio.CommentSubdomain.BusinessLayer;

import com.example.portfolio.CommentSubdomain.DataLayer.CommentRepository;
import com.example.portfolio.CommentSubdomain.PresentationLayer.CommentRequestModel;
import com.example.portfolio.CommentSubdomain.PresentationLayer.CommentResponseModel;
import com.example.portfolio.utils.EntityDTOUtil;
import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Flux<CommentResponseModel> getAllComments() {
        return commentRepository.findAll().map(EntityDTOUtil::toCommentResponseDTO);
    }

    @Override
    public Mono<CommentResponseModel> getCommentByCommentId(String commentId) {
        return commentRepository.findCommentByCommentId(commentId).map(EntityDTOUtil::toCommentResponseDTO);
    }

    @Override
    public Mono<CommentResponseModel> addComment(Mono<CommentRequestModel> commentRequestModel) {
        return commentRequestModel
                .map(request -> {
                    request.setDate(LocalDate.now());
                    return EntityDTOUtil.toCommentEntity(request);
                })
                .flatMap(commentRepository::insert)
                .flatMap(savedComment -> commentRepository.findById(savedComment.getId()))
                .map(EntityDTOUtil::toCommentResponseDTO)
                .doOnSuccess(response -> log.info("Comment added successfully with ID: {}", response.getCommentId()));
    }

    @Override
    public Mono<CommentResponseModel> updateComment(Mono<CommentRequestModel> commentRequestModel, String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .flatMap(existingComment -> commentRequestModel.map(requestModel -> {
                    existingComment.setAuthor(requestModel.getAuthor());
                    existingComment.setDate(LocalDate.now());
                    existingComment.setComment(requestModel.getComment());
                    return existingComment;
                }))
                .switchIfEmpty(Mono.error(new NotFoundException("Comment not found with id: " + commentId)))
                .flatMap(commentRepository::save)
                .map(EntityDTOUtil::toCommentResponseDTO);
    }

    @Override
    public Mono<Void> deleteComment(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment not found with id: " + commentId)))
                .flatMap(commentRepository::delete);
    }

    @Override
    public Mono<Void> approveComment(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment not found with id: " + commentId)))
                .map(comment -> {
                    comment.setApproved(true);
                    return comment;
                })
                .flatMap(commentRepository::save)
                .then();
    }

    @Override
    public Flux<CommentResponseModel> getAllApprovedComments() {
        return commentRepository.findAllByIsApproved(true).map(EntityDTOUtil::toCommentResponseDTO);
    }

    @Override
    public Flux<CommentResponseModel> getAllUnapprovedComments() {
        return commentRepository.findAllByIsApproved(false).map(EntityDTOUtil::toCommentResponseDTO);
    }

}
