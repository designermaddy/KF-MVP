package com.kornferry.rd.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kornferry.response.CandidateResponse;
import com.kornferry.service.CandidateService;

@RestController
@RequestMapping("/Candidate")
public class CandidateController {
	@Autowired
	CandidateService candidateService;
	 @RequestMapping(value = "/getCandidatePipeline", method = RequestMethod.GET)
	 public CandidateResponse getRequisition() {
	// System.out.println(service.getData());		
		 return candidateService.getCandidatePipeline();
	 }
}
