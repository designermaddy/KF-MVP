

app.controller('PageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	$scope.items = {"transactionID":null,"engagementList":[{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89102,"Engagement":"GSK","Client":"GSK","Industry":"Online Payments","Type":"Won","RequsitionCount":5,"DaysLeft":5,"Status":"Open","Location":"New Jersey","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89109,"Engagement":"IBM Director Human Resource","Client":"IBM","Industry":"Information Technology","Type":"Won","RequsitionCount":1,"DaysLeft":7,"Status":"Hold","Location":"Alabama","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89113,"Engagement":"Cognizant Technical Architect","Client":"Cognizant","Industry":"Information Technology","Type":"Won","RequsitionCount":5,"DaysLeft":8,"Status":"Closed","Location":"Alaska","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89129,"Engagement":"DB Director Finance","Client":"Deutsche Bank","Industry":"Banking & Finance","Type":"Pipeline","RequsitionCount":1,"DaysLeft":2,"Status":"Pipeline","Location":"Arkansas","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null},{"EngagementNumber":89134,"Engagement":"Regional Sales Manager","Client":"Rite Aid","Industry":"Pharmacy","Type":"Won","RequsitionCount":4,"DaysLeft":14,"Status":"Hold","Location":"California","StartDate":"08/01/2016","EndDate":"09/06/2016","Image":"","ClientDetails":null,"PersonDetails":null,"RequisitionDetails":null}],"donut":null}
	// $scope.items = [{
		// "name": "name 1",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 2",
			// "category": [{
			// "category": "engineering"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 3",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "engineering"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 4",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 5",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 6",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 7",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 8",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 9",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 10",
			// "category": [{
			// "category": "management"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 11",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 12",
			// "category": [{
			// "category": "engineering"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 13",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 14",
			// "category": [{
			// "category": "engineering"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 15",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "engineering"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 16",
			// "category": [{
			// "category": "management"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 17",
			// "category": [{
			// "category": "management"
		// }],
			// "branch": "East"
	// }, {
		// "name": "name 18",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 19",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "West"
	// }, {
		// "name": "name 20",
			// "category": [{
			// "category": "engineering"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Peter",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Frank",
			// "category": [{
			// "category": "management"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Joe",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Ralph",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Gina",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Sam",
			// "category": [{
			// "category": "management"
		// }, {
			// "category": "engineering"
		// }],
			// "branch": "East"
	// }, {
		// "name": "Britney",
			// "category": [{
			// "category": "business"
		// }],
			// "branch": "West"
	// }];

	// create empty search model (object) to trigger $watch on update
	$scope.search = {};

	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};

	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems = $scope.items.engagementList.length;
	$scope.entryLimit = 1; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

	// $watch search to update pagination
	$scope.$watch('search', function (newVal, oldVal) {
		$scope.filtered = filterFilter($scope.items.engagementList, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
}]);