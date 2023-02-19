function mailMaga() {
  const docText = "メール送信テスト";
  const subject = '【テスト】メール送信テスト';
  　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 //名前、ファイルの添付あり
  var fileId = "ｘｘｘｘ";
  var xlsxName = "yahoo広告_monthly_report.xlsx";
  var fetchUrl = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + fileId + "&amp;exportFormat=xlsx";

  //OAuth2対応が必要
  var fetchOpt = {
    "headers" : { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    "muteHttpExceptions" : true
  };
  var xlsxFile = UrlFetchApp.fetch(fetchUrl, fetchOpt).getBlob().setName(xlsxName)

  var options = {name: 'teamPDCA　WEB運用チーム', attachments: xlsxFile}; 

  const destName = "〇〇㈱";　　　　　　　　　　 //送信先の会社名
  const strMonth = "1";
  const unyoJokyo = "時折配信を停止していますね。安定して掲載したほうが効果が測定しやすいですよ。";
  const kaizenPlan = "予算を切らさないようにしてみましょう";
  const recipient = "@gmail.com";
  const body = docText
  .replace('{宛名}',destName)
  .replace('{月名}',strMonth)
  .replace('{運用状況}',unyoJokyo)
  .replace('{改善提案}',kaizenPlan);
  GmailApp.sendEmail(recipient, subject, body, options);

}