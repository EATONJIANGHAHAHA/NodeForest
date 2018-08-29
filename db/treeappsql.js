var TreeAppSQL = {
    insert:'INSERT INTO tree_app(apply_date, species, location, sayings, name, status, amount, user_id) VALUES(?,?,?,?,?,?,?,?)',
    getById:'SELECT * FROM tree_app WHERE id = ? ',
    update:'UPDATE tree_app SET status = ?, staff_id = ?, complete_date = ? WHERE id = ? ',
};
module.exports = TreeAppSQL;