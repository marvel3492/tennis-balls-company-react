var express = require('express');
var {adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord} = require('../util');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/product/
// ==================================================
router.get('/', adminonly, function(_req, res, _next) {
    let query = "SELECT * FROM product";
    renderAllRecords(res, query);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/product/1/show
// ==================================================
router.get('/:recordid/show', function(req, res, _next) {
    let query = "SELECT * FROM product WHERE product_id = ?";
    renderOneRecord(req, res, query);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, _next) {
    let homepage_value = 0;
    if (req.body.homepage) {
        homepage_value = 1;
    }

    let description = "";
    if (req.body.description) {
        description = req.body.description;
    }
    
    let insertquery = "INSERT INTO product(productname, prodimage, description, saleprice, stock, homepage) VALUES(?, ?, ?, ?, ?, ?)";
    db.run(insertquery, [req.body.productname, req.body.prodimage, description, req.body.saleprice, req.body.stock, homepage_value], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3039/product/1/edit
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, _next) {
    let query = "SELECT * FROM product WHERE product_id = ?";
    renderOneRecord(req, res, query);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, _next) {
    let homepage_value = 0;
    if (req.body.homepage) {
        homepage_value = 1;
    }

    let description = "";
    if (req.body.description) {
        description = req.body.description;
    }

    let updatequery = "UPDATE product SET productname = ?, prodimage = ?, description = ?, saleprice = ?, stock = ?, homepage = ? WHERE product_id = ?";
    db.run(updatequery, [req.body.productname, req.body.prodimage, description, req.body.saleprice, req.body.stock, homepage_value, req.body.id], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3039/product/delete
// ==================================================
router.delete('/delete', adminonly, function(req, res, _next) {
    let query = "DELETE FROM product WHERE product_id = ?";
    deleteRecord(req, res, query);
});

module.exports = router;