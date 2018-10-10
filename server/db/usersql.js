/**
 * SQL statements of the user related operations that should be stored in the database,
 * or retrieved from the database.
 * @type {{
 * insert: string,
 * queryAll: string,
 * getUserById: string,
 * checkUser: string,
 * checkUsername: string,
 * checkEmail: string,
 * getTrees: string,
 * getAddress: string,
 * updatePassword: string,
 * updateAccount: string}}
 */
var UserSQL = {
    insert:'INSERT INTO user(username, password, email, address, phone) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
    checkUser: 'SELECT * FROM user WHERE username = ? and password = ? ',
    usernameExist: 'SELECT COUNT(*) AS number FROM user WHERE username = ? ',
    checkEmail:'SELECT * FROM user WHERE email = ? ',
    getTrees: 'select t.id AS treeId, t.health, t.height, t.species, t.sayings, t.name, t.last_edit, t.owner_id, t.staff_id, t.location_id, p.upload_date, p.path AS photo_src, l.location, l.path AS location_src from tree t join photo p on t.id = p.tree_id join location l on l.id = t.location_id where p.upload_date = (select max(upload_date) from photo where tree_id = t.id) AND t.owner_id = ? ',
    getAddress:'SELECT * FROM user WHERE id = ? ',
    updatePassword:'UPDATE user SET password = ? WHERE id = ? ',
    updateAccount:'UPDATE user SET password = ?, email = ? , address = ? , phone = ? WHERE id = ? '
};
module.exports = UserSQL;