/**
 * GoogleDriveを操作
 */
var GDrive = class {
    constructor() { }
}

/**
 * フォルダ名からフォルダーを取得する。なければ作成して取得する。
 * @param {*} folderName フォルダ名
 */
GDrive.prototype.getCreateFolderByName = function (folderName) {
    const folderIterator = DriveApp.getRootFolder().getFoldersByName(folderName);
    // 存在する場合
    if (folderIterator.hasNext()) { return folderIterator.next(); }
    //ない場合
    return DriveApp.getRootFolder().createFolder(folderName);
}