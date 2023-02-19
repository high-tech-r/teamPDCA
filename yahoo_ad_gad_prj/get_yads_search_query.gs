
//YSS
function yss_search_query_Report() {

  // SpreadSheet ID
  var spreadSheetID = "";

  // 出力先シート名
  var yss_sheet_name = 'search_query';
  var reportName = 'yss_search_query_report';
  var reportType = 'SEARCH_QUERY';
  var mailAddress = "xxxx@gmail.com";
  
  var yadDef = new YadsFieldDefinition();
  var colNameList = yadDef.get_col_name_list(reportType);
  var clsYadsMan = new clsYadsManager(mailAddress);

  var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList);
  clsYadsMan.wait_report(jobId);
  var yss_data = clsYadsMan.downloadReport(jobId);
  updateCsv(yss_sheet_name, yss_data, spreadSheetID);
}