import { Router } from 'express';
import { genSalt, hash as _hash } from 'bcryptjs';
import { adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../util.js';
var router = Router();

// ==================================================
// Route Provide Login Window
// URL: http://localhost:5000/customer/register
// ==================================================
/*
router.get('/register', function(req, res, next) {
    if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id) { //Must logout first
        res.redirect('/');
    } else {
        res.render('customer/addrec');
    }
});
*/

// ==================================================
// Route Provide Login Window
// ==================================================
/*
router.get('/login', function(req, res, next) {
    if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id) { //Must logout first
        res.redirect('/');
    } else {
        res.render('customer/login', {message: "Please Login"});
    }
});
*/

// ==================================================
// Route Check Login Credentials
// ==================================================
/*
router.post('/login', function(req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, password, isadmin FROM customer WHERE username = ?";
    db.all(query, [req.body.username], (err, result) => {
        if (err) {
            renderError(res, err);
        } else {
            if (result[0]) {
                // Username was correct. Check if password is correct
                compare(req.body.password, result[0].password, function(err, result2) {
                    if (err) {
                        renderError(res, err);
                    } else if (result2) {
                        // Password is correct. Set session variables for user.
                        var custid = result[0].customer_id;
                        req.session.customer_id = custid;
                        var custname = result[0].firstname + " " + result[0].lastname;
                        req.session.custname = custname;
                        var isadmin = result[0].isadmin;
                        req.session.isadmin = isadmin;
                        res.redirect('/');
                    } else {
                        // password do not match
                        res.status(401).render('customer/login', {message: "Wrong Password"});
                    }
                });
            } else {
                res.status(401).render('customer/login', {message: "Wrong Username"});
            }
        }
    });
});
*/

// ==================================================
// Route Check Login Credentials
// URL: http://localhost:5000/customer/logout
// ==================================================
/*
router.get('/logout', function(req, res, next) {
    req.session.customer_id = 0;
    req.session.custname = "";
    req.session.cart = [];
    req.session.qty = [];
    req.session.isadmin = 0;
    res.redirect('/');
});
*/

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:5000/customer/
// ==================================================
router.get('/', adminonly, function(_req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username FROM customer";
    renderAllRecords(res, query);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:5000/customer/1/show
// ==================================================
router.get('/:recordid/show', adminonly, function(req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username FROM customer WHERE customer_id = ?";
    renderOneRecord(req, res, query);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, _next) {
    let insertquery = "INSERT INTO customer (firstname, lastname, email, phone, address, city, state, zip, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    genSalt(10, (err, salt) => {
        if (err) {
            renderError(res, err);
        } else {
            _hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    renderError(res, err);
                } else {
                    db.run(insertquery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash], (err) => {
                        if (err) {
                            renderError(res, err, 400);
                        } else {
                            //if (req.session.isadmin) {
                                res.json({});
                            //} else {
                            //    res.redirect('/customer/login'); // Customer must login with created account.
                            //}
                        }
                    });
                }
            });
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:5000/customer/1/edit
// ==================================================
router.get('/:recordid/edit', adminonly, function(req, res, _next) {
    let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username FROM customer WHERE customer_id = ?";
    renderOneRecord(req, res, query);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function(req, res, _next) {
    // If an admin changes a customer's first name and/or last name, the customer must logout and log back in for the change to take effect.
    if (req.body.password === "" || req.body.password === null) {
        let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ? WHERE customer_id = ?";
        db.run(updatequery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.id], (err) => {
            if (err) {
                renderError(res, err, 400);
            } else {
                res.json({});
            }
        });
    } else {
        genSalt(10, (err, salt) => {
            if (err) {
                renderError(res, err);
            } else {
                _hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        renderError(res, err);
                    } else {
                        let updatequery = "UPDATE customer SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ?, password = ? WHERE customer_id = ?";
                        db.run(updatequery, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash, req.body.id], (err) => {
                            if (err) {
                                renderError(res, err, 400);
                            } else {
                                res.json({});
                            }
                        });
                    }
                });
            }
        });
    }
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:5000/customer/delete
// ==================================================
router.delete('/delete', adminonly, function(req, res, _next) {
    let query = "DELETE FROM customer WHERE customer_id = ?";
    deleteRecord(req, res, query);
});

export default router;