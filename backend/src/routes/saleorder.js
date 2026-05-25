import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import { isSaleOrderArray, isSaleOrder } from '../../../shared/src/Data.js';
import db from '../db.js';
const router = Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/saleorder/
// ==================================================
router.get('/', adminOnly, function(_req, res, _next) {
    renderAllRecords(res, "SELECT * FROM saleorder", isSaleOrderArray);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/saleorder/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM saleorder WHERE order_id = ?", isSaleOrder);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function(req, res, _next) {
    db.run("INSERT INTO saleorder(customer_id, saledate, customernotes, paymentstatus) VALUES(?, ?, ?, ?)", [req.body.customer_id, req.body.saledate, req.body.customernotes, req.body.paymentstatus], (err) => {
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
router.get('/:recordid/edit', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM saleorder WHERE order_id = ?", isSaleOrder);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function(req, res, _next) {
    db.run("UPDATE saleorder SET customer_id = ?, saledate = ?, customernotes = ?, paymentstatus = ? WHERE order_id = ?", [req.body.customer_id, req.body.saledate, req.body.customernotes, req.body.paymentstatus, req.body.id], (err) => {
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
router.delete('/delete', adminOnly, function(req, res, _next) {
    deleteRecord(req, res, "DELETE FROM saleorder WHERE order_id = ?");
});

export default router;