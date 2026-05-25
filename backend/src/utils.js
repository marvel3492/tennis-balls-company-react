import db from "./db.js";

/**
 * @param {ExpressSession} req 
 * @param {ExpressResponse} res 
 * @param {NextFunction} next 
 */
export function adminOnly(req, res, next) {
    if (!req.session.isadmin) {
        renderError(res, new Error("Unauthorized"), 401);
    } else {
        next();
    }
}

/**
 * @param {ExpressSession} req 
 * @param {ExpressResponse} res 
 * @param {NextFunction} next 
 */
export function adminOrCustomer(req, res, next) {
    if (!req.session.isadmin && !req.session.customer_id) {
        renderError(res, new Error("Unauthorized"), 401);
    } else {
        next();
    }
}

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res 
 * @param {string} query
 */
export function deleteRecord(req, res, query) {
    db.run(query, [req.body.recordid], (err) => {
        if (err) {
            renderError(res, err);
        } else {
            res.json({});
        }
    });
}

/**
 * @param {ExpressSession} req 
 * @param {ExpressResponse} res 
 * @param {NextFunction} next 
 */
export function guestOnly(req, res, next) {
    if (req.session.isadmin || req.session.customer_id) {
        renderError(res, new Error("Unauthorized"), 401);
    } else {
        next();
    }
}

/**
 * @param {ExpressSession} req 
 * @param {ExpressResponse} res 
 * @param {NextFunction} next 
 */
export function guestOrAdmin(req, res, next) {
    if (!req.session.isadmin && req.session.customer_id) {
        renderError(res, new Error("Unauthorized"), 401);
    } else {
        next();
    }
}

/**
 * @param {(req: ExpressSession, res: ExpressResponse, next: NextFunction) => void} f 
 */
export function handleSession(f) {
    /**
     * @param {ExpressSession} req 
     * @param {ExpressResponse} res 
     * @param {NextFunction} next 
     */
    return (req, res, next) => f(req, res, next);
}

/**
 * @param {ExpressResponse} res 
 * @param {string} query
 * @param {(result: unknown) => boolean} isTypeArray
 */
export function renderAllRecords(res, query, isTypeArray) {
    db.all(query, (err, result) => {
        if (err) {
            renderError(res, err);
        } else if (isTypeArray(result)) {
            res.json(result);
        } else {
            renderError(res, new Error("Unexpected data type"));
        }
    });
}

/**
 * @param {ExpressResponse} res 
 * @param {Error} err
 * @param {number} [code=500]
 */
export function renderError(res, err, code = 500) {
    console.log(err);
    res.status(code).json({
        message: err.message,
        name: err.name,
        stack: err.stack
    });
}

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res 
 * @param {string} query
 * @param {(result: unknown) => boolean} isType
 */
export function renderOneRecord(req, res, query, isType) {
    db.all(query, [req.params.recordid], (err, result) => {
        if (err) {
            renderError(res, err);
        } else if (!result || result.length === 0) {
            renderError(res, new Error("Not found"));
        } else if (!isType(result[0])) {
            renderError(res, new Error("Unexpected data type"));
        } else {
            res.json(result[0]);
        }
    });
}