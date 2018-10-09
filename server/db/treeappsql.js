/**
 * SQL statements of the tree application related operations that should be stored in the database,
 * or retrieved from the database.
 * @type {{insert: string, getById: string, update: string}}
 */
var TreeAppSQL = {
    insert:'INSERT INTO tree_app(apply_date, species, location, sayings, name, status, amount, user_id, staff_id) VALUES(?,?,?,?,?,?,?,?,?)',
    getById:'SELECT * FROM tree_app WHERE id = ? ',
    update:'UPDATE tree_app SET status = ?, complete_date = ?, reason = ? WHERE id = ? ',
    getSpecies:'SELECT species FROM species',
    getLocations:'SELECT location FROM location',
    getIncompleteByUserId:'SELECT * FROM tree_app WHERE complete_date IS NULL AND user_id = ?',
    getCompleteByUserId:'SELECT * FROM tree_app WHERE complete_date IS NOT NULL AND user_id = ?',
    getIncompleteByStaffId:'SELECT * FROM tree_app WHERE complete_date IS NULL AND staff_id = ?',
    getCompleteByStaffId:'SELECT * FROM tree_app WHERE complete_date IS NOT NULL AND staff_id = ?',
};
module.exports = TreeAppSQL;