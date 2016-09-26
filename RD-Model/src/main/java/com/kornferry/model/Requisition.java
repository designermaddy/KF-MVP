package com.kornferry.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Requisition implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8759214312029317133L;
	@JsonProperty("RequisitionNumber")
	private int requisitionNumber;
	@JsonProperty("Requisition")
	private String requisitionDetails;
	@JsonProperty("RequisitionDate")
	private Date requisitionDate;
	@JsonProperty("Resources")
	private int resources;
	@JsonProperty("Engagement")
	private String engagementDetails;
	@JsonProperty("DaysLeft")
	private int daysLeft;
	@JsonProperty("Left")
	private String left;
	@JsonProperty("Sourced")
	private int sourcedCount;
	@JsonProperty("Screened")
	private int screenedCount;
	@JsonProperty("Interviewed")
	private int interviewedCount;
	@JsonProperty("Offered")
	private int offeredCount;
	@JsonProperty("Hired")
	private int hiredCount;
	
	public Requisition(int requisitionNumber, String requisitionDetails, Date requisitionDate, int resources,
			String engagementDetails, int daysLeft, String left, int sourcedCount, int screenedCount, int interviewedCount,
			int offeredCount, int hiredCount) {
		super();
		this.requisitionNumber = requisitionNumber;
		this.requisitionDetails = requisitionDetails;
		this.requisitionDate = requisitionDate;
		this.resources = resources;
		this.engagementDetails = engagementDetails;
		this.daysLeft = daysLeft;
		this.left = left;
		this.sourcedCount = sourcedCount;
		this.screenedCount = screenedCount;
		this.interviewedCount = interviewedCount;
		this.offeredCount = offeredCount;
		this.hiredCount = hiredCount;
	}

	public int getRequisitionNumber() {
		return requisitionNumber;
	}

	public void setRequisitionNumber(int requisitionNumber) {
		this.requisitionNumber = requisitionNumber;
	}

	public String getRequisitionDetails() {
		return requisitionDetails;
	}

	public void setRequisitionDetails(String requisitionDetails) {
		this.requisitionDetails = requisitionDetails;
	}

	public Date getRequisitionDate() {
		return requisitionDate;
	}

	public void setRequisitionDate(Date requisitionDate) {
		this.requisitionDate = requisitionDate;
	}

	public int getResources() {
		return resources;
	}

	public void setResources(int resources) {
		this.resources = resources;
	}

	public String getEngagementDetails() {
		return engagementDetails;
	}

	public void setEngagementDetails(String engagementDetails) {
		this.engagementDetails = engagementDetails;
	}

	public int getDaysLeft() {
		return daysLeft;
	}

	public void setDaysLeft(int daysLeft) {
		this.daysLeft = daysLeft;
	}

	public String getLeft() {
		return left;
	}

	public void setLeft(String left) {
		this.left = left;
	}

	public int getSourcedCount() {
		return sourcedCount;
	}

	public void setSourcedCount(int sourcedCount) {
		this.sourcedCount = sourcedCount;
	}

	public int getScreenedCount() {
		return screenedCount;
	}

	public void setScreenedCount(int screenedCount) {
		this.screenedCount = screenedCount;
	}

	public int getInterviewedCount() {
		return interviewedCount;
	}

	public void setInterviewedCount(int interviewedCount) {
		this.interviewedCount = interviewedCount;
	}

	public int getOfferedCount() {
		return offeredCount;
	}

	public void setOfferedCount(int offeredCount) {
		this.offeredCount = offeredCount;
	}

	public int getHiredCount() {
		return hiredCount;
	}

	public void setHiredCount(int hiredCount) {
		this.hiredCount = hiredCount;
	}	
}
