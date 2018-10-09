/**
 * postcard application api sql operation strings.
 * @type {{insert: string, updateStatus: string, updateReceiveDate: string}}
 */
var PostcardSQL = {
    insert:'INSERT INTO postcard_app(address, post_code, recipient, status, apply_date, tree_id, message) VALUES(?,?,?,?,?,?,?) ',
    updateStatus:'UPDATE postcard_app SET varchar = ? WHERE id = ? ',
    updateReceiveDate:'UPDATE postcard_app SET receive_date = ? WHERE id = ? ',
    unreceivedByUserId:''
}
module.exports = PostcardSQL;