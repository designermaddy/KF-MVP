package com.kornferry.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kornferry.service.TestService;

@Service
public class TestServiceImpl implements TestService {

	/*@Autowired
	SettingHome settingHome;
	*/
	@Transactional(readOnly = true)
	public String getData() {
		//settingHome.findById(1);
		return "success";
	}

}
