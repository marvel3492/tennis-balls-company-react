import { Router } from 'express';
import { renderError } from '../util.js';
var router = Router();

router.get('/', function(req, res, _next) {
    let query = "SELECT * FROM product WHERE description LIKE ? OR productname LIKE ?";
    db.all(query, [`%${req.query.searchcriteria}%`, `%${req.query.searchcriteria}%`], (err, result) => {
        if (err) {
            renderError(res, err);
        } else {
            let query2 = "SELECT COUNT(*) AS products FROM product WHERE description LIKE ? OR productname LIKE ?";
            db.all(query2, [`%${req.query.searchcriteria}%`, `%${req.query.searchcriteria}%`], (err2, result2) => {
                if (err) {
                    renderError(res, err2);
                } else {
                    res.json({allrecs: result, products: result2[0].products});
                }
            });
        }
    });
});

export default router;