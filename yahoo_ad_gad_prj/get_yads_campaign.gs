
//YSS
function yss_Campaign_Report() {
  // SpreadSheet ID
  var spreadSheetID = "xxxx";
  // 出力先シート名
  var yss_campaign_sheet_name = 'campaign';

  var reportName = 'yss_campaign_report';
  var reportType = 'CAMPAIGN';
  var mailAddress = "@gmail.com";
  
  var yadDef = new YadsFieldDefinition();
  var colNameList = yadDef.get_col_name_list(reportType);
  var clsYadsMan = new clsYadsManager(mailAddress);

  var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList);
  clsYadsMan.wait_report(jobId);
  var yss_data = clsYadsMan.downloadReport(jobId);
  updateCsv(yss_campaign_sheet_name, yss_data, spreadSheetID);
}
