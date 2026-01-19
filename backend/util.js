function adminonly(req, res, next) { // TODO later
    // if (!req.session.isadmin) {
    //     return res.redirect('/');  // Return to homepage if accessing restricted area.
    // } else {
        next();
    // }
}

function renderError(res, err, code = 500) {
    console.log(err);
    res.status(code).json({error: err});
}

function renderAllRecords(res, query) {
    db.all(query, (err, result) => {
        if (err) {
            renderError(res, err);
        } else {
            res.json({allrecs: result});
        }
    });
}

function renderOneRecord(req, res, query) {
    db.all(query, [req.params.recordid], (err, result) => {
        if (err) {
            renderError(res, err);
        } else if (!result || result.length === 0) {
            res.status(404).json({error: {code: "Not Found"}});
        } else {
            res.json({onerec: result[0]});
        }
    });
}

function deleteRecord(req, res, query) {
    db.run(query, [req.body.recordid], (err) => {
        if (err) {
            renderError(res, err);
        } else {
            res.json({});
        }
    });
}

module.exports = {adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord}