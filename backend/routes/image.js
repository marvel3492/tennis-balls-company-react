import { Router } from 'express';
import { v4 as uuid } from "uuid";
import multer from "multer";
import path from "path";
import { access, unlink } from 'fs';
import { adminonly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../util.js';
var router = Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const newName = uuid() + ext; // 36 chars + extension
        cb(null, newName);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: (_req, file, cb) => {
        const allowed = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Invalid file type"), false);
        }
        cb(null, true);
    }
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:5000/image/
// ==================================================
router.get('/', adminonly, function (_req, res, _next) {
    let query = "SELECT * FROM image";
    renderAllRecords(res, query);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:5000/image/1/show
// ==================================================
router.get('/:recordid/show', adminonly, function (req, res, _next) {
    let query = "SELECT * FROM image WHERE image_id = ?";
    renderOneRecord(req, res, query);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminonly, function (req, res, _next) {
    upload.single("file")(req, res, (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            if (!req.file) {
                renderError(res, new Error("No file uploaded"), 400);
            } else {
                let insertquery = "INSERT INTO image (filename, description) VALUES (?, ?)";
                db.run(insertquery, [req.file.filename, req.body.description], (err) => {
                    if (err) {
                        renderError(res, err, 400);
                    } else {
                        res.json({});
                    }
                });
            }
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:5000/image/1/edit
// ==================================================
router.get('/:recordid/edit', adminonly, function (req, res, _next) {
    let query = "SELECT * FROM image WHERE image_id = ?";
    renderOneRecord(req, res, query);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminonly, function (req, res, _next) {
    upload.single("file")(req, res, (err) => {
        if (err) {
            renderError(res, err, 400);
        } else {
            if (!req.file) {
                let updatequery = "UPDATE image SET description = ? WHERE image_id = ?";
                db.run(updatequery, [req.body.description, req.body.id], (err) => {
                    if (err) {
                        renderError(res, err, 400);
                    } else {
                        res.json({});
                    }
                });
            } else {
                let query = "SELECT filename FROM image WHERE image_id = ?";
                db.all(query, [req.body.id], (err, result) => {
                    if (err) {
                        renderError(res, err);
                    } else {
                        if (result.length !== 1) {
                            renderError(res, new Error("Old image not present in database"));
                        } else {
                            let updatequery = "UPDATE image SET filename = ?, description = ? WHERE image_id = ?";
                            db.run(updatequery, [req.file.filename, req.body.description, req.body.id], (err) => {
                                if (err) {
                                    renderError(res, err, 400);
                                } else {
                                    access(`uploads/${result[0].filename}`, (err) => {
                                        if (err) {
                                            renderError(res, err);
                                        } else {
                                            unlink(`uploads/${result[0].filename}`, (err) => {
                                                if (err) {
                                                    renderError(res, err);
                                                } else {
                                                    res.json({});
                                                }
                                            });
                                         }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:5000/image/delete
// ==================================================
router.delete('/delete', adminonly, function (req, res, _next) {
    let query = "DELETE FROM image WHERE image_id = ?";
    deleteRecord(req, res, query);
});

export default router;