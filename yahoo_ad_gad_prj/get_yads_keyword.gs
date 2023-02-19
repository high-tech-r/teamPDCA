//YSS
function yss_Group_Day_Report() {
// SpreadSheet ID
  var spreadSheetID = "";
  // 出力先シート名
  var yss_group_day_sheet_name = 'keyword';
  var reportName = 'yss_keyword_report';
  var reportType = 'KEYWORDS';
  var mailAddress = "xxxx@gmail.com";
  var yadDef = new YadsFieldDefinition();
  var colNameList = yadDef.get_col_name_list(reportType);
  var clsYadsMan = new clsYadsManager(mailAddress);
  var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList);
  clsYadsMan.wait_report(jobId);
  var yss_data = clsYadsMan.downloadReport(jobId);
  var clsSSMan = new clsSpreadSheetManager(spreadSheetID);
  clsSSMan.updateCsv(yss_group_day_sheet_name, yss_data, spreadSheetID);
}

//スプレッドシートに記載
function updateCsv(sheet_name, values, spreadSheetID) {
  var ss = SpreadsheetApp.openById(spreadSheetID)
  var this_sheet = ss.getSheetByName(sheet_name);
  var headerrow = this_sheet.getLastRow() +1;
  this_sheet.getRange(headerrow, 1, values.length, values[0].length).setValues(values);
}
