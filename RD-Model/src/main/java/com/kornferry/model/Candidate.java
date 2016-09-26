package com.kornferry.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Candidate implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4918381007145491463L;
	
	@JsonProperty("candidatePercent")
	private int candidatePercent;
	
	@JsonProperty("nonCandidatePercent")
	private int nonCandidatePercent;

	public int getCandidatePercent() {
		return candidatePercent;
	}

	public void setCandidatePercent(int candidatePercent) {
		this.candidatePercent = candidatePercent;
	}

	public int getNonCandidatePercent() {
		return nonCandidatePercent;
	}

	public void setNonCandidatePercent(int nonCandidatePercent) {
		this.nonCandidatePercent = nonCandidatePercent;
	}
	
	

}
