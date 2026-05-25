import { Router } from 'express';
import { genSalt, compare, hash } from 'bcryptjs';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord, guestOnly, guestOrAdmin, adminOrCustomer, handleSession } from '../utils.js';
import db from '../db.js';
import { isCustomer, isCustomerArray } from '../../../shared/src/Data.js';
const router = Router();

// ==================================================
// Route Provide Credentials
// URL: http://localhost:5000/customer/credentials
// ==================================================
router.get('/credentials', handleSession(function(req, res, _next) {
    res.json(/** @type UserDataType */ ({customer_id: req.session.customer_id ?? 0, custname: req.session.custname ?? "", isadmin: req.session.isadmin ?? 0}));
}));

/**
 * @param {ExpressResponse} res 
 * @param {boolean} success 
 * @param {string} message 
 * @param {number} [code=200] 
 */
function sendLoginData(res, success, message, code = 200) {
    res.status(code).json(/** @type LoginDataType */ ({success: success, message: message}));
}

// ==================================================
// Route Check Login Credentials
// URL: http://localhost:5000/customer/login
// ==================================================
router.post('/login', guestOnly, handleSession(function(req, res, _next) {
    db.all("SELECT * FROM customer WHERE username = ?", [req.body.username], (err, result) => {
        if (err) {
            renderError(res, err);
        } else {
            if (!result[0]) {
                sendLoginData(res, false, "Wrong Username", 401);
            } else if (!isCustomer(result[0]) || !("password" in result[0] && typeof result[0].password === "string")) {
                renderError(res, Error("Unexpected data type"));
            } else {
                // Username was correct. Check if password is correct
                compare(req.body.password, result[0].password, function(err, result2) {
                    if (err) {
                        renderError(res, err);
                    } else if (!result2) {
                        // password do not match
                        sendLoginData(res, false, "Wrong Password", 401);
                    } else if (!isCustomer(result[0])) {
                        renderError(res, Error("Unexpected data type"));
                    } else {
                        // Password is correct. Set session variables for user.
                        req.session.customer_id = result[0].customer_id;
                        req.session.custname = result[0].firstname + " " + result[0].lastname;
                        req.session.isadmin = result[0].isadmin;
                        sendLoginData(res, true, "Logging in");
                    }
                });
            }
        }
    });
}));

// ==================================================
// Route Check Login Credentials
// URL: http://localhost:5000/customer/logout
// ==================================================
router.post('/logout', adminOrCustomer, handleSession(function(req, res, _next) {
    req.session.customer_id = 0;
    req.session.custname = "";
    req.session.cart = {};
    req.session.isadmin = 0;
    res.json({});
}));

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:5000/customer/
// ==================================================
router.get('/', adminOnly, function(_req, res, _next) {
    renderAllRecords(res, "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer", isCustomerArray);
});

// ==================================================
// Route to view one specific record.
// URL: http://localhost:5000/customer/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer WHERE customer_id = ?", isCustomer);
});

/**
 * @param {ExpressRequest} req 
 * @param {ExpressResponse} res 
 * @param {(hash: string) => void} callback 
 */
function generatePassword(req, res, callback) {
    genSalt(10, (err, salt) => {
        if (err) {
            renderError(res, err);
        } else if (salt === undefined) {
            renderError(res, Error("Salt is undefined"));
        } else {
            hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    renderError(res, err);
                } else if (hash === undefined) {
                    renderError(res, Error("Hash is undefined"));
                } else {
                    callback(hash);
                }
            });
        }
    });
}

// ==================================================
// Route to obtain user input and save in database.
// URL: http://localhost:5000/customer
// ==================================================
router.post('/', guestOrAdmin, handleSession(function(req, res, _next) {
    generatePassword(req, res, (hash) => {
        db.run("INSERT INTO customer (firstname, lastname, email, phone, address, city, state, zip, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash], (err) => {
            if (err) {
                renderError(res, err, 400);
            } else if (req.session.isadmin) {
                res.json({redirect: false});
            } else {
                res.json({redirect: true}); // Guest must login with created account.
            }
        });
    });
}));

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:5000/customer/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, isadmin FROM customer WHERE customer_id = ?", isCustomer);
})

// ==================================================
// Route to save edited data in database.
// URL: http://localhost:5000/customer/save
// ==================================================
router.post('/save', adminOnly, function(req, res, _next) {
    // If an admin changes a customer's first name and/or last name, the customer must logout and log back in for the change to take effect.
    if (req.body.password === "" || req.body.password === null) {
        db.run("UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ? WHERE customer_id = ?", [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.id], (err) => {
            if (err) {
                renderError(res, err, 400);
            } else {
                res.json({});
            }
        });
    } else {
        generatePassword(req, res, (hash) => {
            db.run("UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ?, password = ? WHERE customer_id = ?", [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash, req.body.id], (err) => {
                if (err) {
                    renderError(res, err, 400);
                } else {
                    res.json({});
                }
            });
        });
    }
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:5000/customer/delete
// ==================================================
router.delete('/delete', adminOnly, function(req, res, _next) {
    deleteRecord(req, res, "DELETE FROM customer WHERE customer_id = ?");
});

export default router;