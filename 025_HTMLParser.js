var HTMLParser = class extends Parser { }

/**
 * 文字列からHTMLタグを取り除く
 * @param {string} text html文字列 
 */
HTMLParser.prototype.deleteTags = function (text) {
    return text.replace(/<("[^"]*"|'[^']*'|[^'">])*>|\r\n|\n|\r/g, '');
}