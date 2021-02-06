var Parser = class { }

/**
 * 範囲内の文字列を切り出す
 * @param {string} text 対象文字列 
 * @param {string} from  
 * @param {string} to 
 */
Parser.prototype.between = function (text, from, to) {
    var re = new RegExp("(?<=" + from + ").*?(?=" + to + ")", 'g')
    return text.match(re);
}
