import { Router } from 'express';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import { isPromotionArray, isPromotion } from '../../../shared/src/Data.js';
import db from '../db.js';
const router = Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3039/promotion/
// ==================================================
router.get('/', adminOnly, function(_req, res, _next) {
    renderAllRecords(res, "SELECT * FROM promotion", isPromotionArray);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3039/promotion/1/show
// ==================================================
router.get('/:recordid/show', function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM promotion WHERE promotion_id = ?", isPromotion);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function(req, res, _next) {
    db.run("INSERT INTO promotion(image_id, promotitle, description, startdate, enddate, discountrate) VALUES(?, ?, ?, ?, ?, ?)", [req.body.image_id ? req.body.image_id : null, req.body.promotitle, req.body.description, req.body.startdate, req.body.enddate, req.body.discountrate], (err) => {
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
router.get('/:recordid/edit', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM promotion WHERE promotion_id = ?", isPromotion);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function(req, res, _next) {
    db.run("UPDATE promotion SET image_id = ?, promotitle = ?, description = ?, startdate = ?, enddate = ?, discountrate = ? WHERE promotion_id = ?", [req.body.image_id ? req.body.image_id : null, req.body.promotitle, req.body.description, req.body.startdate, req.body.enddate, req.body.discountrate, req.body.id], (err) => {
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
router.delete('/delete', adminOnly, function(req, res, _next) {
    deleteRecord(req, res, "DELETE FROM promotion WHERE promotion_id = ?");
});

export default router;