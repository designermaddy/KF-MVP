/**
 * 
 */
package com.kornferry.response;

import java.util.List;

import com.kornferry.model.Requisition;
import com.kornferry.model.RequisitionStatus;

/**
 * @author 35235
 *
 */
public class RequisitionResponse extends BaseResponse {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1850003248308176763L;
	private List<Requisition> requisitionList;
	private List<RequisitionStatus> requisitionStatusList;
		
	public List<Requisition> getRequisitionList() {
		return requisitionList;
	}

	public void setRequisitionList(List<Requisition> requisitionList) {
		this.requisitionList = requisitionList;
	}
	
	public List<RequisitionStatus> getRequisitionStatusList() {
		return requisitionStatusList;
	}

	public void setRequisitionStatusList(List<RequisitionStatus> requisitionStatusList) {
		this.requisitionStatusList = requisitionStatusList;
	}

}
