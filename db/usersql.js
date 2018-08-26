var UserSQL = {
    insert:'INSERT INTO User(id,userName) VALUES(?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
};
module.exports = UserSQL;