class clsAdsManager {
  constructor() {
    this.projectId = 'xxx';
    this.result = new Array();
    this.affectedRow = 0;
    this.yadDef = new YadsFieldDefinition();
  }

  /********************************************************************************
   * public Method
  **********************************************************************************/
  /*-big query----------------------------------------------------------------------*/
  insert_bg_yss_Report(arrReportDif) {
    var tableId = arrReportDif["tableId"];
    var reportName = arrReportDif["reportName"];
    var reportType = arrReportDif["reportType"];
    var mailAddress = arrReportDif["mailAddress"];
    
    var clsYadsMan = new clsYadsManager(mailAddress);
    var colNameList = this.yadDef.get_col_name_list(reportType);
    var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList);
    clsYadsMan.wait_report(jobId);
    var yss_data = clsYadsMan.downloadReport(jobId);

    var bqAdap = new clsBqAdapter();
    bqAdap.insertBigquery(yss_data, tableId, reportType, mailAddress);
  }
  
  del_ins_bg_yss_Report(arrReportDif, startDate, endDate) {
    var tableId = arrReportDif["tableId"];
    var reportName = arrReportDif["reportName"];
    var reportType = arrReportDif["reportType"];
    var mailAddress = arrReportDif["mailAddress"];

    var dateRangeType = "CUSTOM_DATE";
    
    var clsYadsMan = new clsYadsManager(mailAddress);
    var colNameList = this.yadDef.get_col_name_list(reportType);
    var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList, dateRangeType, startDate, endDate);
    clsYadsMan.wait_report(jobId);

    var yss_data = clsYadsMan.downloadReport(jobId);
    var bqAdap = new clsBqAdapter();
    bqAdap.deleteAndInsertBigQuery(tableId, startDate, endDate ,yss_data, reportType, mailAddress);
  }

  updateSSReport(arrReportDif, startDate, endDate, kind = "REPORT", islm = false) {
// SpreadSheet ID
    var fileId = "";
    switch(kind) {
      case "REPORT":
        fileId = "xxx";
        break;
      case "DATA":
        fileId = "xxx";
        break;
    }
  // YSS CSV DL
    var sheetName = arrReportDif["tableId"];
    if(islm) {
      sheetName = 'lm_' + sheetName;
    }
    var reportName = arrReportDif["reportName"];
    var reportType = arrReportDif["reportType"];
    var mailAddress = arrReportDif["mailAddress"];
    var dateRangeType = "CUSTOM_DATE";
    // 出力先シート名
    var yadDef = new YadsFieldDefinition();
    var colNameList = yadDef.get_col_name_list(reportType);
    var clsYadsMan = new clsYadsManager(mailAddress);

    var jobId = clsYadsMan.getReportJobId(reportName, reportType, colNameList, dateRangeType, startDate, endDate);
    clsYadsMan.wait_report(jobId);
    var yss_data = clsYadsMan.downloadReport(jobId, true);
    var clsSSman = new clsSpreadSheetManager(fileId);
    clsSSman.sheetClear(sheetName);
    clsSSman.updateCsv(sheetName, yss_data);
  }

  getTargetReportList(mail_address) {
    var bqAdap = new clsBqAdapter();
    return bqAdap.getTargetReportList(mail_address);
  }

  /*-mail ----------------------------------------------------------------------*/
  sendCSVReport(mailAddress){
    const docText = "メール送信テスト\r\nteamPDCA";
    const subject = '【テスト】２月分CSVデータ送信テスト';
    var fileId = "xxxx";
    var xlsxName = "yahoo広告_monthly_report.xlsx";
    var fetchUrl = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + fileId + "&amp;exportFormat=xlsx";
    //OAuth2対応が必要
    var fetchOpt = {
      "headers" : { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      "muteHttpExceptions" : true
    };
    var xlsxFile = UrlFetchApp.fetch(fetchUrl, fetchOpt).getBlob().setName(xlsxName)
    var options = {name: 'teamPDCA　WEB運用チーム', attachments: xlsxFile}; 　  
    GmailApp.sendEmail(mailAddress, subject, docText, options);
  }

  sendCSV(mailAddress, attachmentFiles){
    const docText = "メール送信テスト\r\nteamPDCA";
    const subject = '【テスト】２月分CSV送信テスト';
    console.log(attachmentFiles);
    MailApp.sendEmail(mailAddress, "CSV file", "CSV file honbun", {attachments:attachmentFiles});
     　  
  }

  sendReport(mailAddress){
    
    const docText = "メール送信テスト\r\nteamPDCA";
    const subject = '【テスト】２月分分析レポート送信テスト';
    var fileId = "1FSYLj0Zkmu7b4zfme7qom-MX40H9-VrT4O1CvwxX1eg";
    var xlsxName = "yahoo広告_monthly_report.xlsx";
    var fetchUrl = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + fileId + "&amp;exportFormat=xlsx";
    //OAuth2対応が必要
    var fetchOpt = {
      "headers" : { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      "muteHttpExceptions" : true
    };
    var xlsxFile = UrlFetchApp.fetch(fetchUrl, fetchOpt).getBlob().setName(xlsxName)
    var options = {name: 'teamPDCA　WEB運用チーム', attachments: xlsxFile}; 　  
    GmailApp.sendEmail(mailAddress, subject, docText, options);
  }

  getCSVAttachment(yssUserInfo) {
    // 出力先シート名
    var fileId = "xxx";
    var sbMan = new clsSpreadSheetManager(fileId);
    var csv_data = sbMan.getShCSVbLobData(yssUserInfo.tableId);
    return csv_data;
//    var options = {attachments:[blob]};
//    return [{fileName:arrReportDif["tableId"] + '.csv', mimeType:"text/comma-separated-values", content:csv_data}];
  }

  /********************************************************************************
   * private Method
  **********************************************************************************/

  
}
