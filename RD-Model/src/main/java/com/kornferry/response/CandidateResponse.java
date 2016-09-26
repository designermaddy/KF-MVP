package com.kornferry.response;

import java.util.List;

import com.kornferry.model.Candidate;

public class CandidateResponse extends BaseResponse{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6876057164000275861L;
	private List<Candidate> candidateList;
	
	public List<Candidate> getCandidateList() {
		return candidateList;
	}
	public void setCandidateList(List<Candidate> candidateList) {
		this.candidateList = candidateList;
	}
	
	
}
