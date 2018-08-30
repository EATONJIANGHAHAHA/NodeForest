/**
 * postcard application api sql operation strings.
 * @type {{insert: string, updateStatus: string, updateReceiveDate: string}}
 */
var PostcardSQL = {
    insert:'INSERT INTO postcard_app(address, post_code, status, apply_date, receive_date) VALUES(?,?,?,?,?) ',
    updateStatus:'UPDATE postcard_app SET status = ? WHERE id = ? ',
    updateReceiveDate:'UPDATE postcard_app SET receive_date = ? WHERE id = ? ',
}
module.exports = PostcardSQL;