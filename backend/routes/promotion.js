var express = require('express');
var {adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord} = require('../util');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/promotion/
// ==================================================
router.get('/', adminonly, function(_req, res, _next) {
    let query = "SELECT * FROM promotion";
    renderAllRecords(res, query);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/promotion/1/show
// ==================================================
router.get('/:recordid/show', function(req, res, _next) {
    let query = "SELECT * FROM promotion WHERE promotion_id = ?";
    renderOneRecord(req, res, query);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, _next) {
    let description = "";
    if (req.body.description) {
        description = req.body.description;
    }

    let insertquery = "INSERT INTO promotion(promotitle, promoimage, description, startdate, enddate, discountrate) VALUES(?, ?, ?, ?, ?, ?)";
    db.run(insertquery, [req.body.promotitle, req.body.promoimage, description, req.body.startdate, req.body.enddate, req.body.discountrate], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3039/promotion/1/edit
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, _next) {
    let query = "SELECT * FROM promotion WHERE promotion_id = ?";
    renderOneRecord(req, res, query);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, _next) {
    let description = "";
    if (req.body.description) {
        description = req.body.description;
    }

    let updatequery = "UPDATE promotion SET promotitle = ?, promoimage = ?, description = ?, startdate = ?, enddate = ?, discountrate = ? WHERE promotion_id = ?";
    db.run(updatequery, [req.body.promotitle, req.body.promoimage, description, req.body.startdate, req.body.enddate, req.body.discountrate, req.body.id], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3039/promotion/delete
// ==================================================
router.delete('/delete', adminonly, function(req, res, _next) {
    let query = "DELETE FROM promotion WHERE promotion_id = ?";
    deleteRecord(req, res, query);
});

module.exports = router;