import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import { isProductArray, isProduct } from '../../../shared/src/Data.js';
import db from '../db.js';
const router = Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/product/
// ==================================================
router.get('/', adminOnly, function(_req, res, _next) {
    renderAllRecords(res, "SELECT * FROM product", isProductArray);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/product/1/show
// ==================================================
router.get('/:recordid/show', function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM product WHERE product_id = ?", isProduct);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function(req, res, _next) {
    db.run("INSERT INTO product(image_id, productname, description, saleprice, stock, homepage) VALUES(?, ?, ?, ?, ?, ?)", [req.body.image_id ? req.body.image_id : null, req.body.productname, req.body.description, req.body.saleprice, req.body.stock, req.body.homepage ? 1 : 0], (err) => {
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
router.get('/:recordid/edit', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM product WHERE product_id = ?", isProduct);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function(req, res, _next) {
    db.run("UPDATE product SET image_id = ?, productname = ?, description = ?, saleprice = ?, stock = ?, homepage = ? WHERE product_id = ?", [req.body.image_id ? req.body.image_id : null, req.body.productname, req.body.description, req.body.saleprice, req.body.stock, req.body.homepage ? 1 : 0, req.body.id], (err) => {
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
router.delete('/delete', adminOnly, function(req, res, _next) {
    deleteRecord(req, res, "DELETE FROM product WHERE product_id = ?");
});

export default router;