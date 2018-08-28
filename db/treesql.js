var TreeSQL = {
    insert:'INSERT INTO tree(height, location, location_image, species, sayings, name, owner_id, staff_id, health, last_edit) ' +
        'VALUES(?,?,?,?,?,?,?,?,?,?)',
    getById:'SELECT max(p.upload_date) AS upload_date, t.id, t.name, t.sayings, t.species, t.location, t.location_image, ' +
        't.health, t.last_edit from photo p join tree t on t.id = p.tree_id WHERE p.tree_id = ? ',
    getPhotos:'SELECT * FROM photo WHERE tree_id = ? ',
    update:'UPDATE tree SET height = ?, health = ?, last_edit = ? WHERE id = ? '
};
module.exports = TreeSQL;