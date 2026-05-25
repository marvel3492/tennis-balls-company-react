import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import { isOrderDetailArray, isOrderDetail } from '../../../shared/src/Data.js';
import db from '../db.js';
const router = Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/orderdetail/
// ==================================================
router.get('/', adminOnly, function(_req, res, _next) {
    renderAllRecords(res, "SELECT * FROM orderdetail", isOrderDetailArray);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/orderdetail/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM orderdetail WHERE orderdetail_id = ?", isOrderDetail);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function(req, res, _next) {
    db.run("INSERT INTO orderdetail(order_id, product_id, saleprice, qty) VALUES(?, ?, ?, ?)", [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty], (err) => {
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
router.get('/:recordid/edit', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM orderdetail WHERE orderdetail_id = ?", isOrderDetail);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function(req, res, _next) {
    db.run("UPDATE orderdetail SET order_id = ?, product_id = ?, saleprice = ?, qty = ? WHERE orderdetail_id = ?", [req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty, req.body.id], (err) => {
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
router.delete('/delete', adminOnly, function(req, res, _next) {
    deleteRecord(req, res, "DELETE FROM orderdetail WHERE orderdetail_id = ?");
});

export default router;