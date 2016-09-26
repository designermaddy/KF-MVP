package com.kornferry.rd.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kornferry.response.RequisitionResponse;
import com.kornferry.service.RequisitionService;

@RestController
@RequestMapping("/Requisition")
public class RequisitionController {
	@Autowired
	RequisitionService requisitionService;
	 @RequestMapping(value = "/getRequisition", method = RequestMethod.GET)
	 public RequisitionResponse getRequisition() {
	// System.out.println(service.getData());		
		 return requisitionService.getRequisition();
	 }
	 
	 @RequestMapping(value = "/getRequisitionStatus", method = RequestMethod.GET)
	 public RequisitionResponse getRequisitionStatus() {
	// System.out.println(service.getData());		
		 return requisitionService.getRequisitionStatus();
	 }


}
