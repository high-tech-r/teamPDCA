
//YSS
function yss_ad_grp_Report() {
  // SpreadSheet ID
  var spreadSheetID = "xxxx";

  // 出力先シート名
  var yss_sheet_name = 'yh_ad_grp';
  var reportName = 'yss_adgroup_report';
  var reportType = 'ADGROUP';
  var mailAddress = "@gmail.com";
  var yadDef = new YadsFieldDefinition();
  var colNameList = yadDef.get_col_name_list(reportType);
  var clsYadsMan = new clsYadsManager(mailAddress);

  var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList);
  clsYadsMan.wait_report(jobId);
  var yss_data = clsYadsMan.downloadReport(jobId);

  updateCsv(yss_sheet_name, yss_data, spreadSheetID);
}