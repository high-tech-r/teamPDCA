function hukkyuu() {

  var startDate = "2022-09-01";
  var endDate = "2022-09-06";

  var mail_address = "@gmail.com";

  var yssCurrentUser = new clsYssUser();

  var targetReportList = new Array();


  var arrReportDif =　new Array();
  arrReportDif.push({tableId:"ad",reportName:"yss_ad_report",reportType:"AD",mailAddress:mail_address});
  arrReportDif.push({tableId : "campaign",reportName : "yss_campaign_report",reportType : "CAMPAIGN",mailAddress : mail_address});
  arrReportDif.push({tableId : "geo",reportName : "yss_geo_report",reportType : "GEO",mailAddress : mail_address});
  arrReportDif.push({tableId : "keyword",reportName : "yss_keyword_report", reportType : "KEYWORDS", mailAddress : mail_address});
  arrReportDif.push({tableId : "adgroup",reportName : "yss_adgroup_report", reportType : "ADGROUP",mailAddress : mail_address});
  arrReportDif.push({tableId : "search_query",reportName : "yss_search_query_report",reportType : "SEARCH_QUERY",mailAddress : mail_address});
  arrReportDif.push({tableId : "account",reportName : "yss_account_report",reportType : "ACCOUNT",mailAddress : mail_address});

  for(var i = 0; i< arrReportDif.length ;i++) {
    var adsMan = new clsAdsManager(arrReportDif[i]["mailAddress"]);
    adsMan.del_ins_bg_yss_Report(arrReportDif[i], startDate, endDate);
  }
}

function koshinYss() {

//  var mail_address = "@gmail.com";
  var dt = new Date();
  dt.setDate(dt.getDate()-1);
  var startDate = Utilities.formatDate(dt, 'JST', 'yyyy-MM-dd');
  var endDate = Utilities.formatDate(dt, 'JST', 'yyyy-MM-dd');
  var adsMan = new clsAdsManager();
  var curUser = new clsYssUser();
  var targetReportList =  adsMan.getTargetReportList(curUser.mailAddress);
  for(var i = 0; i< targetReportList.length ;i++) {
    var adsMan = new clsAdsManager(targetReportList[i]["mailAddress"]);
    adsMan.del_ins_bg_yss_Report(targetReportList[i], startDate, endDate);
  }
}
