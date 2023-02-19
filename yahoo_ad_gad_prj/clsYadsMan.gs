class clsYadsManager {
  constructor(mailAddress) {
    this.urlToken = 'https://biz-oauth.yahoo.co.jp/oauth/v1/token';
    this.YssUrlApi = 'https://ads-search.yahooapis.jp/api/v8';
    this.YdnUrlApi = 'https://ads-display.yahooapis.jp/api/v1';
    this.YahooClientId = '';
    this.YahooClientSecret ='';
    this.YahooRefreshToken = ''
    this.YssAccountId = '';
    this.accessToken = '';
    this.set_user_token(mailAddress);
  }

  // 必要なトークン類セット
  set_user_token(mailAddress){
    // googleBigQuery～取得
    var bqAdap = new clsBqAdapter();
    var strSQL = 'select yahoo_client_id, yahoo_client_secret, yahoo_refresh_token, yss_account_id'
                + ' from `xxxx` where mail_address = @maddress'
    bqAdap.exec(strSQL, bqAdap.sqlArgColumnFactory('maddress', mailAddress, "STRING"));

    var sqlResult = bqAdap.result[1];
    this.YahooClientId = sqlResult[1,0];
    this.YahooClientSecret = sqlResult[1,1];
    this.YahooRefreshToken = sqlResult[1,2];
    this.YssAccountId = sqlResult[1,3];
    // アクセストークン更新
    this.accessToken = this.getAccessToken();
  }

  //アクセストークン再取得
  getAccessToken() {
    var payload = {
      grant_type: 'refresh_token',
      client_id: this.YahooClientId,
      client_secret: this.YahooClientSecret,
      refresh_token: this.YahooRefreshToken
    };
    var params = {
      payload : payload
    };
    console.log(payload);
    var response = UrlFetchApp.fetch(this.urlToken, params);
    var response_body = JSON.parse(response.getContentText());
    return response_body['access_token'];
  }

  //レポートをダウンロード
  downloadReport(report_jod_id, needHeader = false, needTotal = false) {
    var headers = {
      'Authorization': 'Bearer ' + this.accessToken
    };
    var payload = {
      accountId: this.YssAccountId,
      reportJobId: report_jod_id
    };
    var params = {
      method : 'post',
      contentType: 'application/json',
      headers: headers,
      payload: JSON.stringify(payload)
    };
    var response = UrlFetchApp.fetch(this.YssUrlApi + '/ReportDefinitionService/download', params);

    var values = Utilities.parseCsv(response);
    if(needHeader == false){
      values.shift();  // ヘッダー削除
    }
    if(needTotal== false){
      values.pop();    //　合計行削除
    }
    var resultdata = this.format_data(values)
    return resultdata;
  }

  wait_report(jobId){
    var loopCnt = 0;
    while(true){
      Utilities.sleep(1000);
      var headers = {
        'Content-Type':'application/json'
        , 'Accept':'application/json'
        , 'Authorization': 'Bearer ' + this.accessToken
      };
      var payload = {
        accountId: this.YssAccountId,
        reportJobIds: [jobId]
      };
      var params = {
        method : 'post',
        contentType: 'application/json',
        headers: headers,
        payload: JSON.stringify(payload)
      };
      var response = UrlFetchApp.fetch(this.YssUrlApi + '/ReportDefinitionService/get', params);
      var response_body = JSON.parse(response);

      if(response_body["rval"]["values"][0]["errors"] != null) {
        break;
      }

      var jobResult = response_body["rval"]["values"][0]["reportDefinition"]["reportJobStatus"]
      if(jobResult == "COMPLETED" || jobResult == "FAILED"|| jobResult == "UNKNOWN") {break;}
      loopCnt++;
      if(loopCnt > 360) {break;}
    }
  }

  format_data(values) {
    for(var i=0;i < values.length;i++) {
      for(var j = 0;j < values[i].length; j++){
        if(values[i][j] == "--") {
          values[i][j] = null;
        }
      }
    }
    return values;
  }

  //YSSのレポートJOBIDを取得
  getReportJobId(reportName, reportType, fieldArray, dateRangeType = "YESTERDAY", startDate = "", endDate = "") {

    if(startDate && endDate) {
      var frmStartDate = Utilities.formatDate(new Date(startDate), 'Asia/Tokyo', 'yyyyMMdd');
      var frmEndDate = Utilities.formatDate(new Date(endDate), 'Asia/Tokyo', 'yyyyMMdd');
    }

    var headers = {
      'Authorization': 'Bearer ' + this.accessToken
    };
    var payload = {
      "accountId": this.YssAccountId,
      "operand": [{
        "accountId": this.YssAccountId,
        "reportDateRangeType": dateRangeType, 
        "reportDownloadEncode": "UTF8", 
        "reportDownloadFormat": "CSV", 
        "fields": fieldArray,
        "dateRange": {
          "startDate":frmStartDate,
          "endDate":frmEndDate
        },
        "reportIncludeZeroImpressions": "FALSE",
        "reportLanguage": "JA", 
        "reportName": reportName, 
        "reportType": reportType, 
        "sortFields": [
          {
            "field": "DAY",
            "reportSortType": "DESC"
          }
        ]
      }]
    };
    var params = {
      method : 'post',
      contentType: 'application/json',
      headers: headers,
      payload: JSON.stringify(payload)
    };

    var response = UrlFetchApp.fetch(this.YssUrlApi + "/ReportDefinitionService/add", params);
    var response_body = JSON.parse(response);

  //console.log(response_body["rval"]["values"][0]["errors"]["details"]["requestKey"])
  //console.log(JSON.stringify(response_body))
//  console.log(response_body["rval"]["values"][0]["errors"][0])
  //console.log(response_body["rval"]["values"][0]["errors"][1])

    var reportJobId = response_body["rval"]["values"][0]["reportDefinition"]["reportJobId"]; 
    return Number(reportJobId);
  }
}