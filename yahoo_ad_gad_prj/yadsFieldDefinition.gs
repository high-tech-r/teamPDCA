class YadsFieldDefinition {

  get_col_name_list(kind) {
    var ad_f_t_array = this.get_col_name_type(kind);
    var resultArray = new Array();
    for (let key in ad_f_t_array) {
      resultArray.push(key.toUpperCase());
    }
    return resultArray;
  }

  get_col_name_type(kind){
    switch(kind){
      case "AD":
        return {
          ACCOUNT_ID:"STRING"
          ,ACCOUNT_NAME:"STRING"
          ,DAY:"DATE"
          ,DEVICE:"STRING"
          ,AD_NAME:"STRING"
          ,CAMPAIGN_NAME:"STRING"
          ,ADGROUP_NAME:"STRING"
          ,COST:"NUMERIC"
          ,AD_TYPE:"STRING"
          ,DEVICE_PREFERENCE:"STRING"
          ,IMPS:"NUMERIC"
          ,CLICKS:"NUMERIC"
          ,CLICK_RATE:"NUMERIC"
          ,AVG_CPC:"NUMERIC"
          ,TITLE1:"STRING"
          ,TITLE2:"STRING"
          ,TITLE3:"STRING"
          ,DESCRIPTION1:"STRING"
          ,DESCRIPTION2:"STRING"
          ,ASSET_TITLE1:"STRING"
          ,ASSET_TITLE2:"STRING"
          ,ASSET_TITLE3:"STRING"
          ,ASSET_TITLE4:"STRING"
          ,ASSET_TITLE5:"STRING"
          ,ASSET_TITLE6:"STRING"
          ,ASSET_TITLE7:"STRING"
          ,ASSET_TITLE8:"STRING"
          ,ASSET_TITLE9:"STRING"
          ,ASSET_TITLE10:"STRING"
          ,ASSET_TITLE11:"STRING"
          ,ASSET_TITLE12:"STRING"
          ,ASSET_TITLE13:"STRING"
          ,ASSET_TITLE14:"STRING"
          ,ASSET_TITLE15:"STRING"
          ,ASSET_DESCRIPTION1:"STRING"
          ,ASSET_DESCRIPTION2:"STRING"
          ,ASSET_DESCRIPTION3:"STRING"
          ,ASSET_DESCRIPTION4:"STRING"
          ,DIRECTORY1:"STRING"
          ,DIRECTORY2:"STRING"
          ,DISPLAY_URL:"STRING"
          ,DESTINATION_URL:"STRING"
          ,AD_ID:"STRING"
          ,CAMPAIGN_ID:"STRING"
          ,ADGROUP_ID:"STRING"
          ,AD_DISTRIBUTION_SETTINGS:"STRING"
          ,AD_EDITORIAL_STATUS:"STRING"
          ,TRACKING_URL:"STRING"
          ,CUSTOM_PARAMETERS:"STRING"
          ,AD_TRACKING_ID:"STRING"
          ,AD_KEYWORD_ID:"STRING"
          ,TOP_IMPRESSION_PERCENTAGE:"NUMERIC"
          ,ABSOLUTE_TOP_IMPRESSION_PERCENTAGE:"NUMERIC"
          ,CONVERSIONS:"NUMERIC"
          ,CONV_RATE:"NUMERIC"
          ,CONV_VALUE:"NUMERIC"
          ,COST_PER_CONV:"NUMERIC"
          ,VALUE_PER_CONV:"NUMERIC"
          ,CONV_VALUE_PER_COST:"NUMERIC"
          ,ALL_CONV:"NUMERIC"
          ,ALL_CONV_RATE:"NUMERIC"
          ,ALL_CONV_VALUE:"NUMERIC"
          ,COST_PER_ALL_CONV:"NUMERIC"
          ,VALUE_PER_ALL_CONV:"NUMERIC"
          ,ALL_CONV_VALUE_PER_COST:"NUMERIC"
          ,CAMPAIGN_TRACKING_ID:"STRING"
          ,ADGROUP_TRACKING_ID:"STRING"
          ,CROSS_DEVICE_CONVERSIONS:"STRING"
          ,LABELS:"STRING"
        };
      case "CAMPAIGN":
        return {
          ACCOUNT_ID : "STRING"
          , ACCOUNT_NAME : "STRING"
          , DAY : "DATE"
          , DEVICE : "STRING"
          , CAMPAIGN_NAME : "STRING"
          , COST : "NUMERIC"
          , IMPS : "NUMERIC"
          , CLICKS : "NUMERIC"
          , CLICK_RATE : "NUMERIC"
          , AVG_CPC : "NUMERIC"
          , CAMPAIGN_ID : "STRING"
          , BID_STRATEGY_ID : "STRING"
          , BID_STRATEGY_NAME : "STRING"
          , BID_STRATEGY_TYPE : "STRING"
          , ENHANCED_CPC_ENABLED : "STRING"
          , EXACT_MATCH_IMPRESSION_SHARE : "NUMERIC"
          , TOP_IMPRESSION_PERCENTAGE : "NUMERIC"
          , ABSOLUTE_TOP_IMPRESSION_PERCENTAGE : "NUMERIC"
          , IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , BUDGET_LOST_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_BUDGET_LOST_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_BUDGET_LOST_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , QUALITY_LOST_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_RANK_LOST_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_RANK_LOST_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , DAILY_SPENDING_LIMIT : "NUMERIC"
          , CAMPAIGN_DISTRIBUTION_SETTINGS : "STRING"
          , CAMPAIGN_DISTRIBUTION_STATUS : "STRING"
          , CAMPAIGN_START_DATE : "NUMERIC"
          , CAMPAIGN_END_DATE : "NUMERIC"
          , CAMPAIGN_TYPE : "STRING"
          , TRACKING_URL : "STRING"
          , CUSTOM_PARAMETERS : "STRING"
          , CAMPAIGN_TRACKING_ID : "STRING"
          , CONVERSIONS : "NUMERIC"
          , CONV_RATE : "NUMERIC"
          , CONV_VALUE : "NUMERIC"
          , COST_PER_CONV : "NUMERIC"
          , VALUE_PER_CONV : "NUMERIC"
          , CONV_VALUE_PER_COST : "NUMERIC"
          , ALL_CONV : "NUMERIC"
          , ALL_CONV_RATE : "NUMERIC"
          , ALL_CONV_VALUE : "NUMERIC"
          , COST_PER_ALL_CONV : "NUMERIC"
          , VALUE_PER_ALL_CONV : "NUMERIC"
          , ALL_CONV_VALUE_PER_COST : "NUMERIC"
          , CROSS_DEVICE_CONVERSIONS : "NUMERIC"
        }
      case "GEO":
        return {
           ACCOUNT_ID : "STRING"
          , ACCOUNT_NAME : "STRING"
          , COUNTRY_TERRITORY : "STRING"
          , PREFECTURE : "STRING"
          , DAY : "DATE"
          , DEVICE : "STRING"
          , CITY : "STRING"
          , COST : "NUMERIC"
          , CAMPAIGN_NAME : "STRING"
          , ADGROUP_NAME : "STRING"
          , IMPS : "NUMERIC"
          , CLICKS : "NUMERIC"
          , CLICK_RATE : "NUMERIC"
          , AVG_CPC : "NUMERIC"
          , CAMPAIGN_ID : "STRING"
          , ADGROUP_ID : "STRING"
          , CONVERSIONS : "NUMERIC"
          , CONV_RATE : "NUMERIC"
          , CONV_VALUE : "NUMERIC"
          , COST_PER_CONV : "NUMERIC"
          , VALUE_PER_CONV : "NUMERIC"
          , CONV_VALUE_PER_COST : "NUMERIC"
          , ALL_CONV : "NUMERIC"
          , ALL_CONV_RATE : "NUMERIC"
          , ALL_CONV_VALUE : "NUMERIC"
          , COST_PER_ALL_CONV : "NUMERIC"
          , VALUE_PER_ALL_CONV : "NUMERIC"
          , ALL_CONV_VALUE_PER_COST : "NUMERIC"
          , CAMPAIGN_TRACKING_ID : "STRING"
          , ADGROUP_TRACKING_ID : "STRING"
          , CROSS_DEVICE_CONVERSIONS : "NUMERIC"
        }
      case "KEYWORDS":
        return {
          ACCOUNT_ID : "STRING"
          , ACCOUNT_NAME : "STRING"
          , DAY : "DATE"
          , DEVICE : "STRING"
          , KEYWORD : "STRING"
          , KEYWORD_MATCH_TYPE : "STRING"
          , CAMPAIGN_NAME : "STRING"
          , ADGROUP_NAME : "STRING"
          , COST : "NUMERIC"
          , QUALITY_INDEX : "NUMERIC"
          , TOP_OF_PAGE_BID_ESTIMATE : "STRING"
          , FIRST_PAGE_BID_ESTIMATE : "STRING"
          , IMPS : "NUMERIC"
          , CLICKS : "NUMERIC"
          , CLICK_RATE : "NUMERIC"
          , AVG_CPC : "NUMERIC"
          , CUSTOM_URL : "STRING"
          , KEYWORD_ID : "STRING"
          , CAMPAIGN_ID : "STRING"
          , ADGROUP_ID : "STRING"
          , ADGROUP_BID : "STRING"
          , BID : "STRING"
          , KEYWORD_DISTRIBUTION_SETTINGS : "STRING"
          , KEYWORD_EDITORIAL_STATUS : "STRING"
          , NEGATIVE_KEYWORD : "STRING"
          , TRACKING_URL : "STRING"
          , CUSTOM_PARAMETERS : "STRING"
          , CONVERSIONS : "NUMERIC"
          , CONV_RATE : "NUMERIC"
          , CONV_VALUE : "NUMERIC"
          , COST_PER_CONV : "NUMERIC"
          , VALUE_PER_CONV : "NUMERIC"
          , CONV_VALUE_PER_COST : "NUMERIC"
          , ALL_CONV : "NUMERIC"
          , ALL_CONV_RATE : "NUMERIC"
          , ALL_CONV_VALUE : "NUMERIC"
          , COST_PER_ALL_CONV : "NUMERIC"
          , VALUE_PER_ALL_CONV : "NUMERIC"
          , ALL_CONV_VALUE_PER_COST : "NUMERIC"
          , TOP_IMPRESSION_PERCENTAGE : "NUMERIC"
          , ABSOLUTE_TOP_IMPRESSION_PERCENTAGE : "NUMERIC"
          , IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , EXACT_MATCH_IMPRESSION_SHARE : "NUMERIC"
          , QUALITY_LOST_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_RANK_LOST_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_RANK_LOST_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_BUDGET_LOST_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_BUDGET_LOST_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , CAMPAIGN_TRACKING_ID : "STRING"
          , ADGROUP_TRACKING_ID : "STRING"
          , KEYWORD_TRACKING_ID : "STRING"
          , CROSS_DEVICE_CONVERSIONS : "NUMERIC"
          , LABELS : "STRING"
          , SYSTEM_SERVING_STATUS : "STRING"
          , SEARCH_PREDICTED_CTR : "STRING"
        }
      case "ADGROUP":
        return {
           ACCOUNT_ID : "STRING"
          , ACCOUNT_NAME : "STRING"
          , DAY : "DATE"
          , DEVICE : "STRING"
          , ADGROUP_NAME : "STRING"
          , CAMPAIGN_NAME : "STRING"
          , COST : "NUMERIC"
          , IMPS : "NUMERIC"
          , CLICKS : "NUMERIC"
          , CLICK_RATE : "NUMERIC"
          , AVG_CPC : "NUMERIC"
          , ADGROUP_ID : "STRING"
          , CAMPAIGN_ID : "STRING"
          , EXACT_MATCH_IMPRESSION_SHARE : "NUMERIC"
          , TOP_IMPRESSION_PERCENTAGE : "NUMERIC"
          , ABSOLUTE_TOP_IMPRESSION_PERCENTAGE : "NUMERIC"
          , IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , QUALITY_LOST_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_RANK_LOST_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_RANK_LOST_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_BUDGET_LOST_TOP_IMPRESSION_SHARE : "NUMERIC"
          , SEARCH_BUDGET_LOST_ABSOLUTE_TOP_IMPRESSION_SHARE : "NUMERIC"
          , ADGROUP_BID : "NUMERIC"
          , ADGROUP_DISTRIBUTION_SETTINGS : "STRING"
          , TRACKING_URL : "STRING"
          , CUSTOM_PARAMETERS : "STRING"
          , CONVERSIONS : "NUMERIC"
          , CONV_RATE : "NUMERIC"
          , CONV_VALUE : "NUMERIC"
          , COST_PER_CONV : "NUMERIC"
          , VALUE_PER_CONV : "NUMERIC"
          , CONV_VALUE_PER_COST : "NUMERIC"
          , ALL_CONV : "NUMERIC"
          , ALL_CONV_RATE : "NUMERIC"
          , ALL_CONV_VALUE : "NUMERIC"
          , COST_PER_ALL_CONV : "NUMERIC"
          , VALUE_PER_ALL_CONV : "NUMERIC"
          , ALL_CONV_VALUE_PER_COST : "NUMERIC"
          , CAMPAIGN_TRACKING_ID : "STRING"
          , ADGROUP_TRACKING_ID : "STRING"
          , CROSS_DEVICE_CONVERSIONS : "NUMERIC"
        }
      case "SEARCH_QUERY":
        return {
          ACCOUNT_ID : "STRING"
          , ACCOUNT_NAME : "STRING"
          , DAY : "DATE"
          , SEARCH_QUERY : "STRING"
          , SEARCH_QUERY_MATCH_TYPE : "STRING"
          , CAMPAIGN_NAME : "STRING"
          , ADGROUP_NAME : "STRING"
          , COST : "NUMERIC"
          , IMPS : "NUMERIC"
          , CLICKS : "NUMERIC"
          , CLICK_RATE : "NUMERIC"
          , AVG_CPC : "NUMERIC"
          , CONVERSIONS : "NUMERIC"
          , CONV_RATE : "NUMERIC"
          , COST_PER_CONV : "NUMERIC"
          , ALL_CONV : "NUMERIC"
          , ALL_CONV_RATE : "NUMERIC"
          , COST_PER_ALL_CONV : "NUMERIC"
        }
      case "ACCOUNT":
        return {
          ACCOUNT_ID:"STRING"
          ,ACCOUNT_NAME:"STRING"
          ,DAY:"DATE"
          ,DEVICE:"STRING"
          ,COST:"NUMERIC"
          ,EXACT_MATCH_IMPRESSION_SHARE:"NUMERIC"
          ,IMPRESSION_SHARE:"NUMERIC"
          ,BUDGET_LOST_IMPRESSION_SHARE:"NUMERIC"
          ,QUALITY_LOST_IMPRESSION_SHARE:"NUMERIC"
          ,TRACKING_URL:"STRING"
          ,CONVERSIONS:"NUMERIC"
          ,CONV_RATE:"NUMERIC"
          ,CONV_VALUE:"NUMERIC"
          ,COST_PER_CONV:"NUMERIC"
          ,VALUE_PER_CONV:"NUMERIC"
          ,CONV_VALUE_PER_COST:"NUMERIC"
          ,ALL_CONV:"NUMERIC"
          ,ALL_CONV_RATE:"NUMERIC"
          ,ALL_CONV_VALUE:"NUMERIC"
          ,COST_PER_ALL_CONV:"NUMERIC"
          ,VALUE_PER_ALL_CONV:"NUMERIC"
          ,ALL_CONV_VALUE_PER_COST:"NUMERIC"
          ,CROSS_DEVICE_CONVERSIONS:"STRING"
        }
    }
  }
}
