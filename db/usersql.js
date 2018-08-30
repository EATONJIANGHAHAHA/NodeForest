var UserSQL = {
    insert:'INSERT INTO user(username, password, email, address, phone) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE id = ? ',
    checkUser: 'SELECT * FROM user WHERE username = ? and password = ? ',
    checkUsername: 'SELECT * FROM user WHERE username = ? ',
    checkEmail:'SELECT * FROM user WHERE email = ? ',
    getTrees: 'SELECT max(p.upload_date) AS upload_date, ANY_VALUE(t.id) id, ANY_VALUE(t.name) name, ANY_VALUE(t.sayings) sayings, ANY_VALUE(t.species) species, ANY_VALUE(t.location) location, ANY_VALUE(t.location_image) location_image, ANY_VALUE(t.health) health, ANY_VALUE(t.last_edit) last_edit, ANY_VALUE(p.path) photo_src from photo p join tree t on t.id = p.tree_id WHERE t.owner_id = ? group by p.tree_id ',
    getAddress:'SELECT * FROM user WHERE id = ? ',
    updatePassword:'UPDATE user SET password = ? WHERE id = ? ',
    updateAccount:'UPDATE user SET email = ? , address = ? , phone = ? WHERE id = ? '
};
module.exports = UserSQL;