/**
 * SQL statements of the tree application related operations that should be stored in the database,
 * or retrieved from the database.
 * @type {{insert: string, getById: string, update: string}}
 */
var TreeAppSQL = {
    insert:'INSERT INTO tree_app(apply_date, species, location_id, sayings, name, status, amount, user_id, staff_id) VALUES(?,?,?,?,?,?,?,?,?)',
    getById:'SELECT t.*, l.location FROM tree_app t JOIN location l on t.location_id = l.id WHERE id = ? ',
    update:'UPDATE tree_app SET status = ?, complete_date = ?, reason = ?, tree_id = ? WHERE id = ? ',
    getSpecies:'SELECT species FROM species',
    getLocations:'SELECT * FROM location',
    getIncompleteByUserId:'SELECT t.*, l.location FROM tree_app t JOIN location l on t.location_id = l.id WHERE complete_date IS NULL AND user_id = ?',
    getCompleteByUserId:'SELECT t.*, l.location FROM tree_app t JOIN location l on t.location_id = l.id WHERE complete_date IS NOT NULL AND user_id = ?',
    getIncompleteByStaffId:'SELECT t.*, l.location FROM tree_app t JOIN location l on t.location_id = l.id WHERE complete_date IS NULL AND staff_id = ?',
    getCompleteByStaffId:'SELECT t.*, l.location FROM tree_app t JOIN location l on t.location_id = l.id WHERE complete_date IS NOT NULL AND staff_id = ?',
};
module.exports = TreeAppSQL;