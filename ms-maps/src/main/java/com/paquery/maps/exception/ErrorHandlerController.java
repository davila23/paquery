package com.paquery.maps.exception;

import com.paquery.maps.dto.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;

@RestControllerAdvice
public class ErrorHandlerController {

    private final static Logger logger = LoggerFactory.getLogger(ErrorHandlerController.class);


    @ExceptionHandler(BusinessException.class)
    public ResponseEntity businessExceptionHandler(Exception e) {
        logger.error("Error Business Exception: ", e);
        BusinessException be = (BusinessException) e;
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(new Response(null, be.getErrorCode(), be.getMessage()));
    }


    @ExceptionHandler(NotFoundPackageException.class)
    public ResponseEntity notFoundPackageExceptionHandler(Exception e) {
        logger.error("Error NotFoundPackage {}", e.getMessage());
        NotFoundPackageException nfpe = (NotFoundPackageException) e;
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(new Response(null, nfpe.getErrorCode(), nfpe.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity notFoundExceptionHandler(Exception e) {
        logger.error("Error NotFountEntity {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new Response(null, 1, e.getMessage()));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity generalExceptionHandler(Exception e) {
        logger.error("Error ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Response(null, 1, e.getMessage()));
    }

}
