/**
 * 表操作クラス
 */
var Table = class {
    constructor() {
        this.columns = [];
        this.rows = [];
    }
}

/**
 * 表に行を追加する
 * @param {string[]} row 新しい行
 */
Table.prototype.addRow = function (row) {
    if (this.columns.length != row.length) {
        console.error("項目の数が一致しません");
        return false;
    }
    this.rows.push(row);
    return true;
}

/**
 * 列定義を設定する
 * @param {string[]} columns 
 */
Table.prototype.setColumns = function(columns){
    this.columns = columns;
}

/**
 * データをリセットする。列定義は消えない。
 */
Table.prototype.clear = function () {
    this.rows = [];
    return true;
}

/**
 * 表を取得する
 * @param {boolean} header true：ヘッダを出力 false：出力しない 
 */
Table.prototype.getTable = function (header = true) {
    if (this.columns === 0 || this.rows === 0) { return [[]] }
    var table = [];
    if (header) { table.push(this.columns) }
    this.rows.forEach(row => {
        table.push(row);
    });
    return table;
}

/**
 * 表をCSVで出力
 * @param {*} header true：ヘッダを出力 false：出力しない 
 */
Table.prototype.toCSV = function (header = true) {
    //テーブルオブジェクトを取得
    return this.getTable(header).join('\n'); //二次元配列をカンマ区切りの文字列に変換
}

