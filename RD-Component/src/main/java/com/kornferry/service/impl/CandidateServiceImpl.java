package com.kornferry.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kornferry.model.Candidate;
import com.kornferry.model.Requisition;
import com.kornferry.response.CandidateResponse;
import com.kornferry.response.RequisitionResponse;
import com.kornferry.service.CandidateService;

@Service
public class CandidateServiceImpl implements CandidateService{
	
	@Transactional(readOnly = true)
	public CandidateResponse getCandidatePipeline() {
		// TODO Auto-generated method stub
		CandidateResponse candidateResponse = new CandidateResponse();
		candidateResponse.setCandidateList(showCandidatePipelineResults());
		return candidateResponse;
	}
	
	/*
	 * Remove Requisition data after Demo
	 */
	private List<Candidate> showCandidatePipelineResults() {
		List<Candidate> candidateList = new ArrayList<Candidate>();
		for(int i=0;i<5;i++){
			Candidate candidate = new Candidate();
			if(i==0){
				candidate.setCandidatePercent(73);
				candidate.setNonCandidatePercent(27);
			}else if(i==1){
				candidate.setCandidatePercent(16);
				candidate.setNonCandidatePercent(84);
			}else if(i==2){
				candidate.setCandidatePercent(5);
				candidate.setNonCandidatePercent(95);
			}else if(i==3){
				candidate.setCandidatePercent(2);
				candidate.setNonCandidatePercent(98);
			}else if(i==4){
				candidate.setCandidatePercent(4);
				candidate.setNonCandidatePercent(96);
			}candidateList.add(candidate);
		}
		return candidateList;
	}
}
