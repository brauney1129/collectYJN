/**
 * データを取得する
 */
function getNewData() {
    var html = getHTML("https://news.yahoo.co.jp/");
    var executeDate = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd hh:mm:ss');
    var htmlParser = new HTMLParser();

    var newsTitle = htmlParser.between(html, '<p class="yjnSub_list_headline">', '</p>');
    var newsMedia = htmlParser.between(html, '<span class="yjnSub_list_sub_media">', '</span>');
    var newsDate = htmlParser.between(html, '<time class="yjnSub_list_sub_date">', '</time>');

    var table = new SheetTable();
    table.setColumns(['取得日時', 'title', 'media', 'date']);

    for (i = 0; i < newsTitle.length; ++i) {
        var row = new Array();
        row.push(executeDate);
        row.push(newsTitle[i]);
        row.push(newsMedia[i]);
        row.push(htmlParser.deleteTags(newsDate[i]));

        table.addRow(row);
    }

    return table;
}

/**
 * 新たにデータを取得してシートに追記する
 */
function getNewDataSheet() {
    var table = getNewData()
    var sheet = getCreateSheetByName('yahooNews');
    table.printSheet(sheet, sheet.getDataRange().isBlank());
}

/**
 * 新たにデータを取得してCSVに保存する
 */
function getNewDataCSV() {
    var table = getNewData()
    var csv = table.toCSV();
    var folder = GDrive.prototype.getCreateFolderByName('yahooNews');
    //Blobオブジェクトの作成
    var blob = Utilities.newBlob(csv, MimeType.CSV, makeFileNameWithTime('yahooNews','.csv'));
    //CSVファイルを作成
    folder.createFile(blob);
}

/**
 * 日時をくっつけたファイル名返す
 * @param {string} fileName 
 * @param {string} ext 
 * @returns {string} ファイル名
 */
function makeFileNameWithTime(fileName,ext) {
    var datetime = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMddHHmm');
    return fileName + '_' + datetime + ext;
}

/**
 * シート上のデータをCSVで保存する
 */
function sheetDataToCSV() {
    var csv = SheetTable.prototype.sheetToCSV(getCreateSheetByName('yahooNews'));
    var folder = GDrive.prototype.getCreateFolderByName('yahooNews');
    //Blobオブジェクトの作成
    var blob = Utilities.newBlob(csv, MimeType.CSV, makeFileNameWithTime('yahooNews','.csv'));
    //CSVファイルを作成
    folder.createFile(blob);
}

/**
 * htmlを取得する
 * @param {string} url 
 */
function getHTML(url) {
    var response = UrlFetchApp.fetch(url);
    if (response.getResponseCode() != 200) { return null; }
    return response.getContentText('UTF-8');
}

/**
 * シートを取得する。なければ作成して取得する。
 * @param {string} name 
 */
function getCreateSheetByName(name) {
    //同じ名前のシートがなければ作成
    var sheet = SpreadsheetApp.getActive().getSheetByName(name)
    if (sheet) { return sheet; }

    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName(name);
    return sheet;
}

function onOpen() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var entries = [{
        name: "新たに取得してCSVで保存",
        functionName: "getNewDataCSV"
    }, {
        name: "新たに取得してシートに追加",
        functionName: "getNewDataSheet"
    }, {
        name: "取得済みのデータをCSVで保存",
        functionName: "sheetDataToCSV"
    }];
    spreadsheet.addMenu("追加機能", entries);
};