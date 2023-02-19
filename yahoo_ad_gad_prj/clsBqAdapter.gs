class clsBqAdapter {
  constructor() {
    this.projectId = '〇〇';
    this.result = new Array();
    this.affectedRow = 0;
    this.yadDef = new YadsFieldDefinition();
  }
  /********************************************************************************
   * Global Method
  **********************************************************************************/
  insertBigquery(yss_data, tableId, reportType, mail_address) {
    var loopCnt = 1;
    var colNameList = this.yadDef.get_col_name_list(reportType);
    var colNameTypeList = this.yadDef.get_col_name_type(reportType);
    var maxExecRowCnt =  Math.floor(10000 / (colNameList.length + 1));
    while(true) {
      var startPosi = ((loopCnt - 1) * maxExecRowCnt) + 1;
      var endposi = (loopCnt * maxExecRowCnt);
      var sliceData = yss_data.slice(startPosi,endposi)
      if(sliceData.length == 0){break;}
      var SQLStr = 'Insert into 〇〇.' + tableId + ' (MAIL_ADDRESS,' + colNameList.join(",") + ') values '
          + this.createInsertParamsString(sliceData, colNameTypeList);
      var argParamlist = this.createParamValueArray(sliceData, colNameTypeList, mail_address);
      this.exec(SQLStr, argParamlist)
      
      loopCnt++;
      if(loopCnt > 100){break;}
    }
  }

  deleteAndInsertBigQuery(tableId, startDate, endDate, yss_data, reportType, mail_address){
    var SQLStr = ""
    // tableName
    var arrDeleteParam = new Array();
    arrDeleteParam.push(this.getSqlArgsArray("startDate", startDate));
    arrDeleteParam.push(this.getSqlArgsArray("endDate", endDate));
    // delete文作成
    SQLStr += "delete from 〇〇." + tableId + " where day between @startDate and @endDate;";
    // 削除実行
    this.exec(SQLStr, arrDeleteParam);
    // インサート実行
    this.insertBigquery(yss_data, tableId, reportType, mail_address);
  }

  getCurrentUser() {
    var strSQL = 'select yahoo_client_id, yahoo_client_secret, yahoo_refresh_token, yss_account_id, mail_address'
                + ' from `〇〇` order by updated_date asc limit 1'
    this.exec(strSQL, new Array());

    var sqlResult = this.result[1];

    // UPDATE実行
    this.updateUserSelectDate(sqlResult[1,4]);
    return {
      yss_client_id : sqlResult[1,0]
      , yss_secret : sqlResult[1,1]
      , yss_refresh_token : sqlResult[1,2]
      , yss_account_id : sqlResult[1,3]
      , yss_mail_address : sqlResult[1,4]
    };
  }

  getTargetReportList(mail_address) {
    var strSQL = 'select TABLE_ID, REPORT_NAME, REPORT_TYPE from `〇〇`'
              + ' where TABLE_ID not in  '
              + '                 (select TABLE_ID from `〇〇` '
              + '                  where MAIL_ADDRESS = @maddress'
              + '                  and LAST_UPDATE_TIME > TIMESTAMP(DATETIME(current_timestamp(), \'Asia/Tokyo\'))'
              + '                  )';

    this.exec(strSQL, this.getSqlArgsArray("maddress", mail_address));
    var sqlResult = this.result;
    var defList = new Array();
    for(var i = 1; i < sqlResult.length ;i++) { // headerはとばす
      var tr = new targetReport();
      tr.tableId = this.result[i][0];
      tr.reportName = this.result[i][1];
      tr.reportType = this.result[i][2];
      tr.mailAddress = mail_address;
      console.log(tr.tableId);
      // UPDATE実行
//      this.updateReprtSelectDate(tr);
      defList.push(tr);
    }
    return defList;
  }


  getMonthlyData(mail_address, tableId, reportType, startDate, endDate) {
    var colNameList = this.yadDef.get_col_name_list(reportType);
    var strSQL = 'select ' + colNameList.join(",") + ' from `〇〇.' + tableId + '`'
              + '  where MAIL_ADDRESS = @maddress'
              + '  and DAY between @sdate and @edate';
    var argParamlist = new Array();
    argParamlist.push(this.getSqlArgsArray("maddress", mail_address));
    argParamlist.push(this.getSqlArgsArray("sdate", startDate));
    argParamlist.push(this.getSqlArgsArray("edate", endDate));
    this.exec(strSQL,argParamlist);
    return this.result;
  }


  /********************************************************************************
   * Private Method
  **********************************************************************************/
  exec(strSQL, paramArray){
    let queryResults = BigQuery.Jobs.query({
      useLegacySql: false,
      parameterMode: "NAMED",
      location: "asia-northeast1",
      timeoutMs : 3000000,
      query: strSQL
      ,queryParameters:paramArray
    }, this.projectId);
    const jobId = queryResults.jobReference.jobId;
    let sleepTimeMs = 5000;
    while (!queryResults.jobComplete) {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs *= 2;
      queryResults = BigQuery.Jobs.getQueryResults(this.projectId, jobId);
    }
    let rows = queryResults.rows;
//    console.log("sleep 20000");
//    Utilities.sleep(20000);
    while (queryResults.pageToken) {
      queryResults = BigQuery.Jobs.getQueryResults(this.projectId, jobId, {
        pageToken: queryResults.pageToken
        , location: queryResults.location
      });
      rows = rows.concat(queryResults.rows);
      this.affectedRow = rows;
    }
    if (rows) {
      const headers = queryResults.schema.fields.map(({name}) => name);
      const data = rows.map(({f}) => f.map(({v}) => v));
      data.unshift(headers);
      this.result = data;
//      console.log(data);
    }
    Logger.log('Load job started. Check on the status of it here: ' +
          'https://bigquery.cloud.google.com/jobs/%s', this.projectId);

  }

  // SQL側引数文字列作成
  // return "(@aa), (@bb), (@cc)"
  createInsertParamsString(csvArray, colNameTypeList) {
    var resultStr = "";
    for(var i = 0;i < csvArray.length;i++){
        if (i != 0) {resultStr += ", "}
        resultStr += "("
//        var firstFlg = true;
        resultStr+= "@MAIL_ADDRESS" + "_" + i;
        for (let key in colNameTypeList) {
//          if (firstFlg == false) {resultStr += ",";}
          resultStr += ", @" + key + "_" + i;
//          firstFlg = false;
        }
        resultStr += ")";
    }
    return resultStr;
  }

  // CSVからすべてのパラメーター配列作成
  // MAIL_ADDRESS は固定
  createParamValueArray(csvArray, colNameTypeList, mail_address){
    var resultArray = new Array();
    for(var i = 0;i < csvArray.length;i++){
        resultArray.push(this.sqlArgColumnFactory('MAIL_ADDRESS' +"_"+ i, mail_address, "STRING"));
        var k = 0;
        for (let key in colNameTypeList) {
          resultArray.push(this.sqlArgColumnFactory(key +"_"+ i, csvArray[i][k], colNameTypeList[key]));
          k++;
        }
    }
    console.log(resultArray);
    return resultArray;
  }

  // 型を自動判別して引数配列を作成
  getSqlArgsArray(paramName, paramValue){
    var paramType;
    switch(Object.prototype.toString.call(paramValue)){
      case '[object String]' :
        paramType = 'STRING';
        break;
      case '[object Number]' :
        paramType = 'NUMERIC';
        break;
      case '[object Date]' :
        paramType = 'TIMESTAMP';
        break;
      default:
        paramType = 'STRING';
    }
   return this.sqlArgColumnFactory(paramName, paramValue, paramType)
  }

  // 引数作成ファクトリメソッド
  sqlArgColumnFactory(paramName, paramValue, paramType = "STRING"){
    paramValue = this.getSqlDefaultEmptyValue(paramValue, paramType);
    return {
        parameterType: {
          type: paramType
        },
        parameterValue: {
          value: paramValue
        },
        name: paramName
      };
  }
  // 0 '' 等の値なしの場合の型ごとのデフォルト値を取得
  getSqlDefaultEmptyValue(paramValue, ParamType){
    if(paramValue != '' && paramValue != 0) {
      return paramValue
    }
    switch(ParamType) {
      case "STRING":
        return '';
      case "INTEGER":
        return 0;
      case "NUMERIC":
        return 0;
    }
  }

  updateUserSelectDate(mail_address) {
    var strSQL = 'update `〇〇` set last_yads_update_date = TIMESTAMP(DATETIME(current_timestamp(), \'Asia/Tokyo\'))'
                + ' where mail_address = @maddress';
    this.exec(strSQL, this.getSqlArgsArray("maddress", mail_address));
  }
    
  updateReprtSelectDate(targetReport) {
    var strSQL = 'delete `〇〇`'
              + ' where MAIL_ADDRESS = @maddress and TABLE_ID = @table_id';
    var insParam = new Array();
    insParam.push(this.getSqlArgsArray("maddress", targetReport.mailAddress));
    insParam.push(this.getSqlArgsArray("table_id", targetReport.tableId));
    this.exec(strSQL, insParam);
    strSQL = 'insert into `〇〇` (TABLE_ID, REPORT_NAME, REPORT_TYPE, MAIL_ADDRESS, LAST_UPDATE_TIME, LAST_SELECT_DATE) values ('
              + ' @table_id'
              + ' , @reportName'
              + ' , @reportType '
              + ' , @mailAddress '
              + ' , TIMESTAMP(DATETIME(current_timestamp(), \'Asia/Tokyo\')) '
              + ' , TIMESTAMP(DATETIME(current_timestamp(), \'Asia/Tokyo\')) '
              + ')';
    var insParam = new Array();
    insParam.push(this.getSqlArgsArray("table_id", targetReport.tableId));
    insParam.push(this.getSqlArgsArray("reportName", targetReport.reportName));
    insParam.push(this.getSqlArgsArray("reportType", targetReport.reportType));
    insParam.push(this.getSqlArgsArray("mailAddress", targetReport.mailAddress));
//     insParam.push(this.getSqlArgsArray("lastUpdateDate", Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd: hh:mm:ss')));
//     insParam.push(this.getSqlArgsArray("lastSelectDate", Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd: hh:mm:ss')));
    this.exec(strSQL, insParam);
  }


}
