var UserSQL = {
    insert:'INSERT INTO User(username, password, email, address, phone) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
    checkUser: 'SELECT * FROM user WHERE username = ? and password = ? ',
    checkUsername: 'SELECT * FROM user WHERE username = ? ',
    checkEmail:'SELECT * FROM user WHERE email = ? '
};
module.exports = UserSQL;