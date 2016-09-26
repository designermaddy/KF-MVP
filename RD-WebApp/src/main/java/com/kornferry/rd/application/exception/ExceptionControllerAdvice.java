package com.kornferry.rd.application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Class to handle exceptions at global and responds error information
 * 
 * @author Hexaware Technologies
 *
 */
@ControllerAdvice
public class ExceptionControllerAdvice {

    /**
     * Method to handle exception and respond with error code and error details
     * 
     * @param exception
     * @return ResponseEntity
     */
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ServiceError> baseExceptionHandler(BaseException exception) {
        return new ResponseEntity<ServiceError>(exception.getErrorInfo(), HttpStatus.OK);
    }
}