var report  = angular.module("reportApp",[]);
report.controller('ReportController',function($scope,$http){

var userReport;

//dummy data for testing :

var report1 = {
  name:"Report 1",
  description:"Concerning User 3 report",
  UserToReport:"User3"
};

var report2 = {
  name:"Report 2",
  description:"Concerning User 1 report",
  UserToReport:"User1"
};

var report3 = {
  name:"Report 3",
  description:"Concerning User 2 report",
  UserToReport:"User2"
};

var allReports = [report1,report2,report3];

});
