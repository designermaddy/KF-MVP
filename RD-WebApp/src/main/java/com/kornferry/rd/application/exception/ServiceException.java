package com.kornferry.rd.application.exception;

/**
 * Custom service exception for application
 *
 * @author Hexaware Technologies
 *
 */

public class ServiceException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = 3396052525061128174L;
    private String errorMessage;
    private String errorDetails;
    private String errorCode;

    public ServiceException() {
        super();
    }

    /**
     * Constructor with arguments
     *
     * @param errorMessage
     */
    public ServiceException(String errorMessage) {
        super();
        this.errorMessage = errorMessage;
    }

    /**
     * Constructor with arguments
     *
     * @param errorMessage
     * @param errorCode
     */
    public ServiceException(String errorMessage, String errorCode) {
        super();
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }

    /**
     * Constructor with arguments
     *
     * @param errorMessage
     * @param errorDetails
     * @param errorCode
     */
    public ServiceException(String errorMessage, String errorDetails, String errorCode) {
        super();
        this.errorMessage = errorMessage;
        this.errorDetails = errorDetails;
        this.errorCode = errorCode;
    }

    /**
     * @return the errorCode
     */
    public String getErrorCode() {
        return errorCode;
    }

    /**
     * @return the errorDetails
     */
    public String getErrorDetails() {
        return errorDetails;
    }

    /**
     * @return the errorMessage
     */
    public String getErrorMessage() {
        return errorMessage;
    }

    /**
     * @param errorCode
     * the errorCode to set
     */
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * @param errorDetails
     * the errorDetails to set
     */
    public void setErrorDetails(String errorDetails) {
        this.errorDetails = errorDetails;
    }

    /**
     * @param errorMessage
     * the errorMessage to set
     */
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

}
