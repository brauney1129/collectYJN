/**
 * スプレッドシートをテーブル的な使い方するときのクラス
 */
var SheetTable = class extends Table {
    constructor() {
        super();
    }
}

/**
 * 表をシートに出力する
 * @param {*} sheet シートオブジェクト
 * @param {*} header true：ヘッダを出力 false：出力しない 
 */
SheetTable.prototype.printSheet = function (sheet, header = true) {
    if (this.columns === 0 || this.rows === 0) { return false; }
    var table = this.getTable(header);
    if (table.length === 0 || table[0] === 0) { return false; }
    var newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, table.length, table[0].length).setValues(table);
    return true;
}

/**
 * シートの内容をCSVに変換する
 * @param {*} sheet シートオブジェクト
 */
SheetTable.prototype.sheetToCSV = function (sheet) {
    var data = sheet.getDataRange().getValues(); //データ範囲を二次元配列で取得
    return data.join('\n'); //二次元配列をカンマ区切りの文字列に変換
}

/**
 * シートから列定義を設定する。
 * @param {*} sheet シートオブジェクト
 */
SheetTable.prototype.setColumnsbySheet = function (sheet) {
    var data = sheet.getDataRange().getValues();
    if (data.length === 0) { return false; }
    this.columns = data[0];
    return true;
}