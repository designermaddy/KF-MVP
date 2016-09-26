package com.kornferry.rd.application.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kornferry.rd.application.model.Employee;
import com.kornferry.rd.application.model.Greetings;


@RestController
@RequestMapping("/")
public class TestController {

	 @RequestMapping(value = "/Test", method = RequestMethod.GET)
	    public String createProject() {
//		 /@PathVariable("id") int id
		 return "Success";
	    }
	 
	 private static final String template = "Hello, %s!";
	    private final AtomicLong counter = new AtomicLong();

	    @RequestMapping(value="/greeting" , method = RequestMethod.GET)
	    public Greetings greeting(@RequestParam(value="name", defaultValue="World") String name) {
	        return new Greetings(counter.incrementAndGet(),
	                            String.format(template, name));
	    }
	    
	    @RequestMapping(value="/employees"  , method = RequestMethod.GET)
	    public List<Employee> listEmployees() {
	    	System.out.println("Test Data");
	    	List<Employee> employeesList = new ArrayList<>();
	    	Employee employee = new Employee("Testing", "TestLastName", "HEX", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Testing", "TestLastName", "CTS", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Fred", "korn", "TCS", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Tom", "Mac", "WIPR", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Jack", "Albert", "CSC", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Justin", "meow", "OCWEN", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Martin", "Luci", "MPHS", true);
	    	employeesList.add(employee);
	    	employee = new Employee("Fredo", "karl", "ACCNT", true);
	    	employeesList.add(employee);
	        return employeesList;
	        
	    }
	    
/*
	    @RequestMapping(value = "/createEmployee", method = RequestMethod.POST)
	    public void createEmployee(@RequestBody Employee employee) {
	    	System.out.println(employee);
	    }*/

}
