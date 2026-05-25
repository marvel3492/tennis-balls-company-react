import { Router } from 'express';
import { v4 } from 'uuid';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { access, unlink } from 'fs';
import { adminOnly, renderError, renderAllRecords, renderOneRecord, deleteRecord } from '../utils.js';
import { isImageArray, isImage } from '../../../shared/src/Data.js';
import db from '../db.js';
const router = Router();
const storage = diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
        const ext = extname(file.originalname);
        const newName = v4() + ext; // 36 chars + extension
        cb(null, newName);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: (_req, file, cb) => {
        const allowed = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (!allowed.includes(file.mimetype)) {
            cb(new Error("Invalid file type"));
        } else {
            cb(null, true);
        }
    }
});

// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:5000/image/
// ==================================================
router.get('/', adminOnly, function(_req, res, _next) {
    renderAllRecords(res, "SELECT * FROM image", isImageArray);
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:5000/image/1/show
// ==================================================
router.get('/:recordid/show', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM image WHERE image_id = ?", isImage);
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', adminOnly, function(req, res, _next) {
    upload.single("file")(req, res, (err) => {
        if (err) {
            renderError(res, err, 400);
        } else if (!req.file) {
            renderError(res, new Error("No file uploaded"), 400);
        } else {
            db.run("INSERT INTO image (filename, description) VALUES (?, ?)", [req.file.filename, req.body.description], (err) => {
                if (err) {
                    renderError(res, err, 400);
                } else {
                    res.json({});
                }
            });
        }
    });
});

// ==================================================
// Route to edit one specific record.
// URL: http://localhost:5000/image/1/edit
// ==================================================
router.get('/:recordid/edit', adminOnly, function(req, res, _next) {
    renderOneRecord(req, res, "SELECT * FROM image WHERE image_id = ?", isImage);
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', adminOnly, function(req, res, _next) {
    upload.single("file")(req, res, (err) => {
        if (err) {
            renderError(res, err, 400);
        } else if (!req.file) {
            db.run("UPDATE image SET description = ? WHERE image_id = ?", [req.body.description, req.body.id], (err) => {
                if (err) {
                    renderError(res, err, 400);
                } else {
                    res.json({});
                }
            });
        } else {
            db.all("SELECT image_id, filename, description FROM image WHERE image_id = ?", [req.body.id], (err, result) => {
                if (err) {
                    renderError(res, err);
                } else if (result.length !== 1) {
                    renderError(res, new Error("Old image not present in database"));
                } else if (!req.file) {
                    renderError(res, new Error("File undefined"));
                } else {
                    db.run("UPDATE image SET filename = ?, description = ? WHERE image_id = ?", [req.file.filename, req.body.description, req.body.id], (err) => {
                        if (err) {
                            renderError(res, err, 400);
                        } else if (!result[0]) {
                            renderError(res, new Error("Image not found"));
                        } else if (!isImage(result[0])) {
                            renderError(res, new Error("Unexpected data type"));
                        } else {
                            access(`uploads/${result[0].filename}`, (err) => {
                                if (err) {
                                    renderError(res, err);
                                } else if (!result[0]) {
                                    renderError(res, new Error("Image not found"));
                                } else if (!isImage(result[0])) {
                                    renderError(res, new Error("Unexpected data type"));
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
            });
        }
    });
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:5000/image/delete
// ==================================================
router.delete('/delete', adminOnly, function(req, res, _next) {
    deleteRecord(req, res, "DELETE FROM image WHERE image_id = ?");
});

export default router;