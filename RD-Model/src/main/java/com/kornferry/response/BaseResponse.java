/**
 * 
 */
package com.kornferry.response;

import java.io.Serializable;

/**
 * @author 35235
 *
 */
public class BaseResponse implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3475603134703301L;
	private String transactionID;

	public String getTransactionID() {
		return transactionID;
	}

	public void setTransactionID(String transactionID) {
		this.transactionID = transactionID;
	}

}
