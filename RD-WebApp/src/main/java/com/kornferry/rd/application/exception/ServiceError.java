package com.kornferry.rd.application.exception;

import java.io.Serializable;
import java.util.List;

/**
 * Class for setting the error Code, reason detail and detailItems
 * 
 * @author Hexaware Technologies
 * 
 */
public class ServiceError implements Serializable {

    private static final long serialVersionUID = 6423693242883690256L;

    private String errorCode;

    private String reason;

    private String detail;

    private List<String> detailItems;

    /**
     * Default Constructor
     */
    public ServiceError() {

    }

    /**
     * Constructor with the given parameters
     * 
     * @param errorCode
     * @param message
     * @param reason
     */
    public ServiceError(String errorCode, String message, String reason) {
        this(errorCode, message, reason, null);
    }

    /**
     * Constructor with the given parameters
     * 
     * @param errorCode
     * @param message
     * @param reason
     * @param details
     */
    public ServiceError(String errorCode, String message, String reason, List<String> details) {
        this.errorCode = errorCode;
        this.reason = message;
        this.detailItems = details;
        this.detail = reason;
    }

    /**
     * getter for detail
     * 
     * @return detail
     */
    public String getDetail() {
        return detail;
    }

    /**
     * getter for detailItems
     * 
     * @return List of detailItems
     */
    public List<String> getDetailItems() {
        return detailItems;
    }

    /**
     * getter for errorCode
     */
    public String getErrorCode() {
        return errorCode;
    }

    /**
     * getter for reason
     * 
     * @return reason
     */
    public String getReason() {
        return reason;
    }

    /**
     * setter for detail
     * 
     * @param detail
     */
    public void setDetail(String detail) {
        this.detail = detail;
    }

    /**
     * setter for detailItems
     * 
     * @param List
     * of detailItems
     */
    public void setDetailItems(List<String> detailItems) {
        this.detailItems = detailItems;
    }

    /**
     * setter for errorCode
     * 
     * @param errorCode
     */
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * setter for reason
     * 
     * @param reason
     */
    public void setReason(String reason) {
        this.reason = reason;
    }

    /*
     * (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        final String NEWLINE = "\n";
        builder.append("ErrorCode:").append(getErrorCode()).append(" - Reason:[").append(getReason()).append("], Detail:[").append(getDetail()).append("]")
                .append(NEWLINE);
        List<String> details = getDetailItems();
        if (details != null && !details.isEmpty()) {
            builder.append("DetailItems:").append(NEWLINE);
            for (String detail : details) {
                builder.append("\t").append(detail).append(NEWLINE);
            }
        }
        return builder.toString();
    }

}
