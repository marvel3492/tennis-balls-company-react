import { Router } from 'express';
import { renderError } from '../utils.js';
import db from '../db.js';
import { isSearch } from '../../../shared/src/Data.js';
const router = Router();

router.get('/', function(req, res, _next) {
    db.all("SELECT p.product_id, p.productname, p.saleprice, p.stock, i.filename, i.description FROM product p LEFT OUTER JOIN image i ON p.image_id = i.image_id WHERE p.description LIKE ? OR p.productname LIKE ?", [`%${req.query.searchcriteria}%`, `%${req.query.searchcriteria}%`], (err, result) => {
        if (err) {
            renderError(res, err);
        } else if (isSearch(result)) {
            res.json(result);
        } else {
            renderError(res, new Error("Unexpected data type"));
        }
    });
});

export default router;