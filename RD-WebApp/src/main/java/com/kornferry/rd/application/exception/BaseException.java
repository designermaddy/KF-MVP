package com.kornferry.rd.application.exception;


import java.util.List;

/**
 * This is the root abstract exception for the Service exception hierarchy
 * 
 * @author Hexaware Technologies
 * 
 */

public class BaseException extends Exception {

    /**
     * 
     */
    private static final long serialVersionUID = 5548350806241216604L;
    /**
     * the ServiceError object
     */
    protected ServiceError errorInfo;

    /**
     * Constructor for initializing the errorInfo Object
     */
    public BaseException() {
        super();
        this.errorInfo = new ServiceError();
    }

    /**
     * Constructor for initializing the errorInfo Object with the given parameters
     * 
     * @param reason
     * @param errorInfo
     */
    public BaseException(String reason, ServiceError errorInfo) {
        super(reason);
        this.errorInfo = errorInfo;
    }

    /**
     * Constructor for initializing the errorInfo Object with the given parameters
     * 
     * @param reason
     * @param errorInfo
     * @param cause
     */
    public BaseException(String reason, ServiceError errorInfo, Throwable cause) {
        super(reason, cause);
        this.errorInfo = errorInfo;
    }

    /**
     * Constructor for initializing the errorInfo Object with the given parameters
     * 
     * @param reason
     * @param detail
     */
    public BaseException(String reason, String detail) {
        super(reason);
        this.errorInfo = new ServiceError(null, reason, detail);
    }

    /**
     * Constructor for initializing the errorInfo Object with the given parameters
     * 
     * @param errorCode
     * @param reason
     * @param detail
     */
    public BaseException(String errorCode, String reason, String detail) {
        super(reason);
        this.errorInfo = new ServiceError(errorCode, reason, detail);
    }

    /**
     * Constructor for initializing the errorInfo Object with the given parameters
     * 
     * @param errorCode
     * @param reason
     * @param detail
     * @param details
     */
    public BaseException(String errorCode, String reason, String detail, List<String> details) {
        super(reason);
        this.errorInfo = new ServiceError(errorCode, reason, detail, details);
    }

    /**
     * Constructor for initializing the errorInfo Object with the given parameters
     * 
     * @param errorCode
     * @param reason
     * @param detail
     * @param cause
     */
    public BaseException(String errorCode, String reason, String detail, Throwable cause) {
        super(reason, cause);
        this.errorInfo = new ServiceError(errorCode, reason, detail);
    }

    /**
     * getting the errorCode
     */
    public String getErrorCode() {
        return errorInfo.getErrorCode();
    }

    /**
     * @return the errorInfo
     */
    public ServiceError getErrorInfo() {
        return errorInfo;
    }

    /**
     * getting the reason
     */
    @Override
    public String getMessage() {
        return errorInfo.getReason();
    }

    /**
     * setting the errorCode
     */
    public void setErrorCode(String errorCode) {
        errorInfo.setErrorCode(errorCode);
    }

    /**
     * @param errorInfo
     * the errorInfo to set
     */
    public void setErrorInfo(ServiceError errorInfo) {
        this.errorInfo = errorInfo;
    }

    /**
     * setting the reason
     */
    public void setMessage(String message) {
        errorInfo.setReason(message);
    }

    /*
     * (non-Javadoc)
     * @see java.lang.Throwable#toString()
     */
    @Override
    public String toString() {
        return this.getClass().getName() + ":" + errorInfo.toString();
    }

}
