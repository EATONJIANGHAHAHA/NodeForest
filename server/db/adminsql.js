var AdminSQL = {
    checkAdmin: 'SELECT * FROM admin WHERE username = ? and password = ? ',
    updatePassword: 'UPDATE admin SET password = ? WHERE id = ? ',
    getAllStaffs: 'SELECT * FROM staff',
};
module.exports = AdminSQL;