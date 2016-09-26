package com.kornferry.model;

import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RequisitionStatus implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5186793003439660729L;
	
	@JsonProperty("label")
	private String status;
	
	@JsonProperty("data")
	private int[] data;
	
	@JsonProperty("months")
	private String[] month;
		
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int[] getData() {
		return data;
	}

	public void setData(int[] data) {
		this.data = data;
	}

	public String[] getMonth() {
		return month;
	}

	public void setMonth(String[] month) {
		this.month = month;
	}
	
	
	
}
