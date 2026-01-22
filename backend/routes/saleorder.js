import { Router } from 'express';
import { adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../util.js';
var router = Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/saleorder/
// ==================================================
router.get('/', adminonly, function(_req, res, _next) {
    let query = "SELECT * FROM saleorder";
    renderAllRecords(res, query);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/saleorder/1/show
// ==================================================
router.get('/:recordid/show', adminonly, function(req, res, _next) {
    let query = "SELECT * FROM saleorder WHERE order_id = ?";
    renderOneRecord(req, res, query);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function(req, res, _next) {
    let insertquery = "INSERT INTO saleorder(customer_id, saledate, customernotes, paymentstatus) VALUES(?, ?, ?, ?)";
    db.run(insertquery, [req.body.customer_id, req.body.saledate, req.body.customernotes, req.body.paymentstatus], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3039/saleorder/1/edit
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, _next) {
    let query = "SELECT * FROM saleorder WHERE order_id = ?";
    renderOneRecord(req, res, query);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, _next) {
    let description = "";
    if (req.body.customernotes) {
        description = req.body.customernotes;
    }

    let updatequery = "UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, paymentstatus = ? WHERE order_id = ?";
    db.run(updatequery, [req.body.customer_id, req.body.saledate, description, req.body.paymentstatus, req.body.id], (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            res.json({});
        }
    });
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3039/saleorder/delete
// ==================================================
router.delete('/delete', adminonly, function(req, res, _next) {
    let query = "DELETE FROM saleorder WHERE order_id = ?";
    deleteRecord(req, res, query);
});

export default router;