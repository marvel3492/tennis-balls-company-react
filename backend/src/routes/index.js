import { Router } from 'express';
import { renderError } from '../utils.js';
import db from '../db.js';
const router = Router();

router.get('/', function(_req, res, _next) {
    // Not all of the products will show, since some products are out of stock.
    db.all("SELECT p.product_id, p.productname, p.saleprice, p.stock, i.filename, i.description FROM product p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.homepage = 1 AND p.stock > 0", (err, result) => {
        if (err) {
            renderError(res, err);
        } else {
            db.all("SELECT p.promotion_id, i.filename, i.description FROM promotion p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.startdate <= date('now') AND p.enddate >= date('now')", (err2, result2) => {
                if (err2) {
                    renderError(res, err2);
                } else {
                    res.json({catalog: result, promotions: result2});
                }
            });
        }
    });
});

export default router;