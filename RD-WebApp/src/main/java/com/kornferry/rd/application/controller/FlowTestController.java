/**
 * 
 */
package com.kornferry.rd.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kornferry.service.TestService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * @author 35235
 *
 */
@RestController
@RequestMapping("/")
@Api(value = "users")
public class FlowTestController {
	
	@Autowired
	TestService service;
	
	 @RequestMapping(value = "/Flow", method = RequestMethod.GET)
	 @ApiOperation(value = "Returns user details", notes = "Returns a complete list of users details with a date of last modification.", response = String.class)
	    @ApiResponses(value = {
	        @ApiResponse(code = 200, message = "Successful retrieval of user detail", response = String.class),
	        @ApiResponse(code = 404, message = "User with given username does not exist"),
	        @ApiResponse(code = 500, message = "Internal server error")}
	    )
	    public void createProject() {
	 System.out.println(service.getData());
	 }

}
