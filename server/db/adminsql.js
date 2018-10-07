var AdminSQL = {
    checkAdmin: 'SELECT * FROM admin WHERE username = ? and password = ? ',
    updatePassword: 'UPDATE admin SET password = ? WHERE id = ? ',
    getAllStaffs: 'SELECT * FROM staff',
    addStaff:'INSERT INTO staff (username, password, email, phone, address) VALUES (?, ?, ?, ?, ?)'
};
module.exports = AdminSQL;