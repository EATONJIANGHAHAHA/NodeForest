/**
 * postcard application api sql operation strings.
 * @type {{insert: string, updateStatus: string, updateReceiveDate: string}}
 */
var PostcardSQL = {
    insert:'INSERT INTO postcard_app(address, post_code, recipient, status, apply_date, tree_id, message) VALUES(?,?,?,?,?,?,?) ',
    updateStatus:'UPDATE postcard_app SET status = ? WHERE id = ? ',
    updateReceive:'UPDATE postcard_app SET receive_date = ?, status = ? WHERE id = ? ',
    unreceivedByUserId:'select p.* from postcard_app p join tree t on p.tree_id = t.id where t.owner_id = ? AND receive_date IS NULL',
    receivedByUserId:'select p.* from postcard_app p join tree t on p.tree_id = t.id where t.owner_id = ? AND receive_date IS NOT NULL',
    unsentByStaffId:'select p.* from postcard_app p join tree t on p.tree_id = t.id where t.staff_id = ? AND status = "SUBMITTED"',
    sentByStaffId:'select p.* from postcard_app p join tree t on p.tree_id = t.id where t.staff_id = ? AND status = "SENT"',

}
module.exports = PostcardSQL;