var TreeSQL = {
    insert:'INSERT INTO tree(height, location, location_image, species, sayings, name, owner_id, staff_id, health, last_edit) ' +
        'VALUES(?,?,?,?,?,?,?,?,?,?)',
    getById:'SELECT * FROM tree WHERE id = ? ',
    getPhotos:'SELECT * FROM photo WHERE tree_id = ? ',
    update:'UPDATE tree SET height = ?, health = ?, last_edit = ? WHERE id = ?'
};
module.exports = TreeSQL;