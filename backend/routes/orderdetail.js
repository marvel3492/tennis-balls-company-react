var express = require('express');
var {adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord} = require('../util');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/orderdetail/
// ==================================================
router.get('/', adminonly, function(_req, res, _next) {
    let query = "SELECT * FROM orderdetail";
    renderAllRecords(res, query);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/orderdetail/1/show
// ==================================================
router.get('/:recordid/show', adminonly, function(req, res, _next) {
    let query = "SELECT * FROM orderdetail WHERE orderdetail_id = ?";
    renderOneRecord(req, res, query);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, _next) {
    let insertquery = "INSERT INTO orderdetail(order_id, product_id, saleprice, qty) VALUES(?, ?, ?, ?)";
    db.run(insertquery, [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3039/orderdetail/1/edit
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, _next) {
    let query = "SELECT * FROM orderdetail WHERE orderdetail_id = ?";
    renderOneRecord(req, res, query);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, _next) {
    let updatequery = "UPDATE orderdetail SET order_id = ?, product_id = ?, saleprice = ?, qty = ? WHERE orderdetail_id = ?";
    db.run(updatequery, [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty, req.body.id], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3039/orderdetail/delete
// ==================================================
router.delete('/delete', adminonly, function(req, res, _next) {
    let query = "DELETE FROM orderdetail WHERE orderdetail_id = ?";
    deleteRecord(req, res, query);
});

module.exports = router;