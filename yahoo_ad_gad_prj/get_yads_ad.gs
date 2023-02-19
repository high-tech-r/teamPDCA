
//YSS
function yss_ad_Report() {

  // SpreadSheet ID
  var spreadSheetID = "xxxx";

  // 出力先シート名
  var yss_sheet_name = 'ad';

  var reportName = 'yss_ad_report';
  var reportType = 'AD';
  var mailAddress = "@gmail.com";
  
  var yadDef = new YadsFieldDefinition();
  var colNameList = yadDef.get_col_name_list(reportType);
  var clsYadsMan = new clsYadsManager(mailAddress);

  var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList);
  clsYadsMan.wait_report(jobId);
  var yss_data = clsYadsMan.downloadReport(jobId);

  updateCsv(yss_sheet_name, yss_data, spreadSheetID);
}
