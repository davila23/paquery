package com.paquery.packages.exception;

import com.paquery.commons.dto.Response;
import com.paquery.commons.exception.BusinessException;
import com.paquery.security.exception.InvalidCredentialsException;
import com.paquery.security.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;

@RestControllerAdvice
public class ErrorHandlerController {

    private static final Logger logger = LoggerFactory.getLogger(ErrorHandlerController.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity businessExceptionHandler(Exception e) {
        logger.error("BusinessException:", e);
        BusinessException be = (BusinessException) e;
        logger.error("BusinessException:", be);
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(new Response(null, be.getErrorCode(), be.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity notFoundExceptionHandler(Exception e) {
        logger.error("NotFoundException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new Response(null, 1, e.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity unauthorizedExceptionHandler(Exception e) {
        logger.error("UnauthorizedException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new Response(null, 1, "Unauthorized"));
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity invalidCredentialsExceptionHandler(Exception e) {
        logger.error("InvalidCredentialsException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new Response(null, 1, "Invalid credentials"));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity generalExceptionHandler(Exception e) {
        logger.error("ERROR: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Response(null, 1, e.getMessage()));
    }
}
