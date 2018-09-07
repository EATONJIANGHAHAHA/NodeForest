/**
 * SQL statement for operations of the staff that should be stored in the database
 * or retrieved from the database.
 * @type {{
 * insert: string,
 * queryAll: string,
 * getStaffById: string,
 * checkStaff: string,
 * getTrees: string,
 * getTreeApplications: string,
 * getPostcardApplications: string,
 * updatePassword: string, updateAccount: string}}
 */
var StaffSQL = {
    insert:'INSERT INTO staff(username, password, email, address, phone) VALUES(?,?,?,?,?) ',
    queryAll:'SELECT * FROM staff',
    getStaffById:'SELECT * FROM staff WHERE id = ? ',
    checkStaff:'SELECT id AS staffId, username, password, email, phone, address FROM staff WHERE username = ? and password = ? ',
    getTrees:'SELECT * FROM tree WHERE staff_id = ? ',
    getTreeApplications:'SELECT * FROM tree_app WHERE staff_id = ? ',
    getPostcardApplications:'SELECT p.id, p.address, p.post_code, p.status, p.apply_date, p.receive_date, tree_id FROM postcard_app p JOIN tree t on p.tree_id = t.id where staff_id = ? ',
    updatePassword:'UPDATE staff SET password = ? WHERE id = ? ',
    updateAccount:'UPDATE staff SET email = ?, address = ?, phone = ? WHERE id = ? ',
};
module.exports = StaffSQL;