package com.kornferry.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kornferry.model.Requisition;
import com.kornferry.model.RequisitionStatus;
import com.kornferry.response.RequisitionResponse;
import com.kornferry.service.RequisitionService;

@Service
public class RequisitionServiceImpl implements RequisitionService {

	@Transactional(readOnly = true)
	public RequisitionResponse getRequisition() {
		// TODO Auto-generated method stub
		RequisitionResponse requisitionResponse = new RequisitionResponse();
		requisitionResponse.setRequisitionList(showRequisitionResults());
		try {
			Thread.sleep(10 * 1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return requisitionResponse;
	}
	
	@Transactional(readOnly = true)
	public RequisitionResponse getRequisitionStatus() {
		// TODO Auto-generated method stub
		RequisitionResponse requisitionResponse = new RequisitionResponse();
		requisitionResponse.setRequisitionStatusList(showRequisitionStatusResults());
		return requisitionResponse;
	}

	/*
	 * Remove Requisition data after Demo
	 */
	private List<Requisition> showRequisitionResults() {
		List<Requisition> requisitionList = new ArrayList<Requisition>();
		for (int i = 0; i < 20; i++) {
			requisitionList.add(new Requisition(1029102, "Suppliy Chain Director", new Date(), 10, "Paypal IT", 1,
					"Day", 60, 45, 30, 15, 5));
			requisitionList.add(new Requisition(1029103, "Director Human Resource", new Date(), 15,
					"IBM Director Human Resource", 5, "Days", 75, 50, 30, 15, 10));
			requisitionList.add(new Requisition(1029104, "Technical Architect", new Date(), 7,
					"Paypal Techinical Architect", 8, "Days", 35, 33, 30, 15, 4));
			requisitionList.add(new Requisition(1029105, "Director Finance", new Date(), 3, "Verizon Director Finance",
					14, "Day", 25, 20, 30, 15, 4));
			requisitionList.add(new Requisition(1029106, "Regional Sales Manager", new Date(), 5,
					"Rite Aid Regional Sales Manager", 15, "Day", 30, 25, 20, 15, 4));
		}
		return requisitionList;
	}
	
	/*
	 * Remove Requisition Status data after Demo
	 */
	private List<RequisitionStatus> showRequisitionStatusResults() {
		List<RequisitionStatus> requisitionStatusList = new ArrayList<RequisitionStatus>();
		int data[] = {65,45,35};
		String month[] = {"January","February","March"};
		for(int i=0;i<6;i++){
			RequisitionStatus requisitionStatus = new RequisitionStatus();
			if(i==0){
				requisitionStatus.setStatus("Source");
				requisitionStatus.setMonth(month);
				requisitionStatus.setData(data);
			}else if(i==1){
				requisitionStatus.setStatus("Screen");
				requisitionStatus.setMonth(month);
				requisitionStatus.setData(data);
			}else if(i==2){
				requisitionStatus.setStatus("Submit");
				requisitionStatus.setMonth(month);
				requisitionStatus.setData(data);
			}else if(i==3){
				requisitionStatus.setStatus("Interview");
				requisitionStatus.setMonth(month);
				requisitionStatus.setData(data);
			}else if(i==4){
				requisitionStatus.setStatus("Offer");
				requisitionStatus.setMonth(month);
				requisitionStatus.setData(data);
			}else if(i==5){
				requisitionStatus.setStatus("Accept");
				requisitionStatus.setMonth(month);
				requisitionStatus.setData(data);
			}requisitionStatusList.add(requisitionStatus);			
		}		
		return requisitionStatusList;
	}	
		
}
