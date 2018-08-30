/**
 * SQL statements of the tree application related operations that should be stored in the database,
 * or retrieved from the database.
 * @type {{insert: string, getById: string, update: string}}
 */
var TreeAppSQL = {
    insert:'INSERT INTO tree_app(apply_date, species, location, sayings, name, status, amount, user_id) VALUES(?,?,?,?,?,?,?,?)',
    getById:'SELECT * FROM tree_app WHERE id = ? ',
    update:'UPDATE tree_app SET status = ?, staff_id = ?, complete_date = ? WHERE id = ? ',
};
module.exports = TreeAppSQL;