var StaffSQL = {
    insert:'INSERT INTO staff(name, password, email, phone, address) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM staff',
    getStaffById:'SELECT * FROM staff WHERE id = ? ',
    checkStaff:'SELECT * FROM staff WHERE name = ? and password = ? ',
    getTrees:'SELECT * FROM tree WHERE staff_id = ?',
    getAddress:'SELECT * FROM staff WHERE id'
}