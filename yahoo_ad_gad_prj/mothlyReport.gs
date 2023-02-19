


function sendMothlyCSV() {
  // 先月の初日～最終日取得
  var today = new Date();
  var dStartDate = new Date(today.getFullYear(), today.getMonth()-1, 1);  
  var strStartDate = Utilities.formatDate(dStartDate, 'JST', 'yyyy-MM-dd');
  var dEndDateDate = new Date(today.getFullYear(), today.getMonth(), 0);
  var strEndDate = Utilities.formatDate(dEndDateDate, 'JST', 'yyyy-MM-dd');

  var adsMan = new clsAdsManager();
  var curUser = new clsYssUser();
  var targetReportList =  adsMan.getTargetReportList(curUser.mailAddress);
  var attachmentFiles = new Array();
  for(var i = 0; i< targetReportList.length ;i++) {
    attachmentFiles.push(adsMan.getCSVAttachment(targetReportList[i], strStartDate, strEndDate));
  }
  adsMan.sendCSV(curUser.mailAddress, attachmentFiles);
}

function updateMothlyReport() {
  // 先月の初日～最終日取得
  var today = new Date();
  var dStartDate = new Date(today.getFullYear(), today.getMonth()-1, 1);  
  var strStartDate = Utilities.formatDate(dStartDate, 'JST', 'yyyy-MM-dd');
  var dEndDateDate = new Date(today.getFullYear(), today.getMonth(), 0);
  var strEndDate = Utilities.formatDate(dEndDateDate, 'JST', 'yyyy-MM-dd');

  var adsMan = new clsAdsManager();
  var curUser = new clsYssUser();
  var targetReportList =  adsMan.getTargetReportList(curUser.mailAddress);

  for(var i = 0; i< targetReportList.length ;i++) {
    console.log(targetReportList[i]);
    adsMan.updateSSReport(targetReportList[i], strStartDate, strEndDate);
  }
}

function updateLmMonthlyReport(){
    
  // 先々月の初日～最終日取得
  var today = new Date();
  var dStartDate = new Date(today.getFullYear(), today.getMonth()-2, 1);  
  var strStartDate = Utilities.formatDate(dStartDate, 'JST', 'yyyy-MM-dd');
  var dEndDateDate = new Date(today.getFullYear(), today.getMonth()-1, 0);
  var strEndDate = Utilities.formatDate(dEndDateDate, 'JST', 'yyyy-MM-dd');

  var adsMan = new clsAdsManager();
  var curUser = new clsYssUser();
  var targetReportList =  adsMan.getTargetReportList(curUser.mailAddress);
  for(var i = 0; i< targetReportList.length ;i++) {
    adsMan.updateSSReport(targetReportList[i], strStartDate, strEndDate, "REPORT", true);
  }
}

function sendMonthlyReport(){
  var adsMan = new clsAdsManager();
  var curUser = new clsYssUser();
  adsMan.sendReport(curUser.mailAddress);
}
