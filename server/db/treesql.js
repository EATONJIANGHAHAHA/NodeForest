/**
 * SQL statements of the tree related operations that should be stored in the database,
 * or retrieved from the database.
 * @type {{insert: string, getById: string, getPhotos: string, update: string}}
 */
var TreeSQL = {
    insert:'INSERT INTO tree(height, location_id, species, sayings, name, owner_id, staff_id, health, last_edit) VALUES(?,?,?,?,?,?,?,?,?)',
    getById:'select p.path AS photo_src, p.upload_date, t.id AS treeId, t.name, t.sayings, t.health, t.owner_id, t.species, t.last_edit, t.staff_id, l.location from photo p join tree t on t.id = p.tree_id join location l on l.id = t.location_id where p.upload_date = (select max(upload_date) from photo where tree_id = ? group by tree_id)',
    getPhotos:'SELECT * FROM photo WHERE tree_id = ? ',
    update:'UPDATE tree SET height = ?, health = ?, last_edit = ? WHERE id = ? ',
    updateLastEdit:'UPDATE tree SET last_edit = ? WHERE id = ?',
    updateSandN:'UPDATE tree SET sayings = ?, name = ? WHERE id = ?',
    updateHeiAndHeal:'UPDATE tree SET height = ?, health = ? WHERE id = ?',
    insertPhoto:' INSERT INTO photo(upload_date, path, tree_id) VALUES (?,?,?)',
};
module.exports = TreeSQL;