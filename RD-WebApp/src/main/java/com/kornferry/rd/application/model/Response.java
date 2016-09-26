/**
 * 
 */
package com.kornferry.rd.application.model;

import com.kornferry.rd.application.exception.ServiceError;

/**
 * @author 35235
 *
 */
public abstract class Response {

	ServiceError errorDetails;

	public ServiceError getErrorDetails() {
		return errorDetails;
	}

	public void setErrorDetails(ServiceError errorDetails) {
		this.errorDetails = errorDetails;
	}
	
}
