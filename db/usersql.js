var UserSQL = {
    insert:'INSERT INTO User(username, password, email, address, phone) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
    checkUser: 'SELECT * FROM user WHERE username = ? and password = ? ',
    checkUsername: 'SELECT * FROM user WHERE username = ? ',
    checkEmail:'SELECT * FROM user WHERE email = ? ',
    getTrees: 'SELECT * FROM tree WHERE user_id = ?',
    getAddress:'SELECT * FROM user WHERE user_id = ?',
    updatePassword:'UPDATE user SET password = ? WHERE id = ? ',
    updateAccount:'UPDATE user SET email = ? , address = ? , phone = ? WHERE id = ? '
};
module.exports = UserSQL;