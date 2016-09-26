package com.kornferry.dataaccess.dao;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import com.github.springtestdbunit.DbUnitTestExecutionListener;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "classpath:spring/Spring-InMemDataSource.xml" })
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class, DirtiesContextTestExecutionListener.class,
		TransactionalTestExecutionListener.class, DbUnitTestExecutionListener.class })
public class WidgetDAOTest {
	// TODO add comments
/*
	@Autowired
	WidgetHome widgetHome;

	@Test
	@DatabaseSetup("classpath:dataset/SampleDataSet.xml")
	public void getTest() {
		BaseDO widget = widgetHome.findById(Widget.class,1);
		System.out.println(widget);
		Assert.assertEquals("text Box", ((Widget)widget).getDesc());
	}

	// @Test
	//TODO Revisit Not working 
	@ExpectedDatabase("classpath:dataset/SavedExpectedResults.xml")
	 public void saveTest(){
	 widgetHome.create(new Widget("Text", "text Box"));
	}*/

}
