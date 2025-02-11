package com.example.portfolio.CommentSubdomain.PresentationLayer;

import com.example.portfolio.CommentSubdomain.BusinessLayer.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/comments")
@Validated
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, allowedHeaders = "content-Type", allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;


    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value = "")
    public Flux<CommentResponseModel> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping(value = "/{commentId}")
    public Mono<ResponseEntity<CommentResponseModel>> getCommentByCommentId(@PathVariable String commentId) {
        return commentService.getCommentByCommentId(commentId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{commentId}")
    public Mono<ResponseEntity<CommentResponseModel>> updateComment(@RequestBody Mono<CommentRequestModel> commentRequestModel, @PathVariable String commentId) {
        return commentService.updateComment(commentRequestModel, commentId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public Mono<ResponseEntity<CommentResponseModel>> addComment(@RequestBody Mono<CommentRequestModel> commentRequestModel) {
        return commentService.addComment(commentRequestModel)
                .map(response -> ResponseEntity.status(HttpStatus.CREATED).body(response));
    }

    @DeleteMapping("/{commentId}")
    public Mono<ResponseEntity<Void>> deleteComment(@PathVariable String commentId) {
        return commentService.deleteComment(commentId)
                .then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)))
                .onErrorResume(e -> Mono.just(new ResponseEntity<Void>(HttpStatus.NOT_FOUND)));
    }

    @PutMapping("/approve/{commentId}")
    public Mono<ResponseEntity<Void>> approveComment(@PathVariable String commentId) {
        return commentService.approveComment(commentId)
                .then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)))
                .onErrorResume(e -> Mono.just(new ResponseEntity<Void>(HttpStatus.NOT_FOUND)));
    }

    @GetMapping(value = "/approved")
    public Flux<CommentResponseModel> getAllApprovedComments() {
        return commentService.getAllApprovedComments();
    }

    @GetMapping(value = "/unapproved")
    public Flux<CommentResponseModel> getAllUnapprovedComments() {
        return commentService.getAllUnapprovedComments();
    }
}
