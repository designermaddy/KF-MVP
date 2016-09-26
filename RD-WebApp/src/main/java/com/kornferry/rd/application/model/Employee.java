package com.kornferry.rd.application.model;

public class Employee {
	
	private String firstName;
	private String lastName;
	private String company;
	private boolean employed;
	
	
	public Employee(String firstName, String lastName, String company, boolean employed) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.company = company;
		this.employed = employed;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public boolean isEmployed() {
		return employed;
	}
	public void setEmployed(boolean employed) {
		this.employed = employed;
	}
	@Override
	public String toString() {
		return "Employee [firstName=" + firstName + ", lastName=" + lastName + ", company=" + company + ", employed="
				+ employed + "]";
	}
	
	

}
