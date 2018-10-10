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
    checkStaff:'SELECT id, username, password, email, phone, address FROM staff WHERE username = ? and password = ? ',
    getTrees:'SELECT max(p.upload_date) AS upload_date, ANY_VALUE(t.id) treeId, ANY_VALUE(t.name) name, ANY_VALUE(t.sayings) sayings, ANY_VALUE(t.species) species, ANY_VALUE(l.location) location, ANY_VALUE(l.path) location_image, ANY_VALUE(t.health) health, ANY_VALUE(t.last_edit) last_edit, ANY_VALUE(p.path) photo_src from photo p join tree t on t.id = p.tree_id join location l on l.id = t.location_id WHERE t.staff_id = ? group by p.tree_id; ',
    getTreeApplications:'SELECT * FROM tree_app WHERE staff_id = ? ',
    getPostcardApplications:'SELECT p.id, p.address, p.post_code, p.status, p.apply_date, p.receive_date, tree_id FROM postcard_app p JOIN tree t on p.tree_id = t.id where staff_id = ? ',
    updatePassword:'UPDATE staff SET password = ? WHERE id = ? ',
    update:'UPDATE staff SET password = ?, email = ?, address = ?, phone = ? WHERE id = ? ',
    getAllStaffs: 'SELECT * FROM staff',
    addStaff:'INSERT INTO staff (username, password, email, phone, address) VALUES (?, ?, ?, ?, ?)',
    getStaffById:'SELECT * FROM staff WHERE id = ? ',
    usernameExist:'SELECT COUNT(*) AS number FROM staff WHERE username = ?',
    hasTrees: ' SELECT COUNT(*) AS number from tree WHERE staff_id = ?',
    hasUnsolvedApplication:'SELECT COUNT(*) AS number from tree_app WHERE staff_id = ? AND complete_date IS NULL',
    delete:'DELETE FROM staff WHERE id = ?',
    getWorkloadOrder:'SELECT any_value(s.id) AS id, COUNT(t.staff_id) AS num FROM staff s LEFT JOIN tree t ON t.staff_id = s.id GROUP BY t.staff_id ORDER BY num'
};
module.exports = StaffSQL;