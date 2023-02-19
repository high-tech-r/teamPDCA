class clsSpreadSheetManager {
  constructor(spreadSheetID) {
    this.spreadSheetId = spreadSheetID;
    this.projectId = '〇〇';
    this.yadDef = new YadsFieldDefinition();
    this.sb = SpreadsheetApp.openById(spreadSheetID)
  }

  sheetClear(sheet_name) {
    var wSheet = this.sb.getSheetByName(sheet_name);
    wSheet.clear();
  }

  //スプレッドシートに記載
  updateCsv(sheet_name, values) {
    var this_sheet = this.sb.getSheetByName(sheet_name);
    var headerrow = this_sheet.getLastRow() +1;
    this_sheet.getRange(headerrow, 1, values.length, values[0].length).setValues(values);
  }

  getShCSVbLobData(sheet_name) {
    var this_sheet = this.sb.getSheetByName(sheet_name);
    var maxColumn = this_sheet.getLastColumn();
    var maxRow    = this_sheet.getLastRow();
    var data = this_sheet.getRange(1,1,maxRow,maxColumn).getValues();
    
    if (data.length > 1) {
      var csv = "";
      for (var row = 0; row < data.length; row++) {
        for (var col = 0; col < data[row].length; col++) {
//          if (data[row][col].toString().indexOf(",") != -1) {
            data[row][col] = "\"" + data[row][col] + "\"";
//          }
        }

        if (row < data.length-1) {
          csv += data[row].join(",") + "\r\n";
        }
        else {
          csv += data[row];
        }
      }
      var csvFile = csv;
    }

    var blob = Utilities.newBlob("", 'text/comma-separated-values', sheet_name + '.csv');
    blob.setDataFromString(csvFile, "Shift_JIS");
    return blob;
  }
}