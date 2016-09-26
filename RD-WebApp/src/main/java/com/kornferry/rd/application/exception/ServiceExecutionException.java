package com.kornferry.rd.application.exception;

import java.util.List;

/**
 * This is the Service exception class for all Service exceptions
 * 
 * @author Hexaware Technologies
 * 
 */
public class ServiceExecutionException extends BaseException {

    /**
     * 
     */
    private static final long serialVersionUID = 4825974248869570659L;

    /**
     * Default Constructor
     */
    public ServiceExecutionException() {
        super();
    }

    /**
     * Constructor with the given parameters
     * 
     * @param reason
     * @param errorInfo
     */
    public ServiceExecutionException(String reason, ServiceError errorInfo) {
        super(reason, errorInfo);
    }

    /**
     * Constructor with the given parameters
     * 
     * @param message
     * @param errorInfo
     * @param cause
     */
    public ServiceExecutionException(String message, ServiceError errorInfo, Throwable cause) {
        super(message, errorInfo, cause);
    }

    /**
     * Constructor with the given parameters
     * 
     * @param reason
     * @param detail
     */
    public ServiceExecutionException(String reason, String detail) {
        super(reason, detail);
    }

    /**
     * Constructor with the given parameters
     * 
     * @param errorCode
     * @param reason
     * @param detail
     */
    public ServiceExecutionException(String errorCode, String reason, String detail) {
        super(errorCode, reason, detail);
    }

    /**
     * Constructor with the given parameters
     * 
     * @param errorCode
     * @param reason
     * @param detail
     * @param detailItems
     */
    public ServiceExecutionException(String errorCode, String reason, String detail, List<String> detailItems) {
        super(errorCode, reason, detail, detailItems);
    }

    /**
     * Constructor with the given parameters
     * 
     * @param errorCode
     * @param reason
     * @param detail
     * @param cause
     */
    public ServiceExecutionException(String errorCode, String reason, String detail, Throwable cause) {
        super(errorCode, reason, detail, cause);
    }

    /**
     * 
     * getter for errorInfo
     */
    public ServiceError geterrorInfo() {
        return errorInfo;
    }

}
