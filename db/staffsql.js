var StaffSQL = {
    insert:'INSERT INTO staff(name, password, email, address, phone) VALUES(?,?,?,?,?) ',
    queryAll:'SELECT * FROM staff',
    getStaffById:'SELECT * FROM staff WHERE id = ? ',
    checkStaff:'SELECT * FROM staff WHERE name = ? and password = ? ',
    getTrees:'SELECT * FROM tree WHERE staff_id = ? ',
    getTreeApplications:'SELECT * FROM tree_app WHERE staff_id = ? ',
    getPostcardApplications:'SELECT p.id, p.address, p.post_code, p.status, p.apply_date, p.receive_date, tree_id FROM postcard_app p JOIN tree t on p.tree_id = t.id where staff_id = ? ',
    updatePassword:'UPDATE staff SET password = ? WHERE id = ? ',
    updateAccount:'UPDATE staff SET email = ?, address = ?, phone = ? WHERE id = ? ',
};
module.exports = StaffSQL;