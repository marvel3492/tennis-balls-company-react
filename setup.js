import db, { databaseName } from "./backend/src/db.js";
import { unlink } from 'fs/promises';
let cleanupRegistered = false;
let cleanupDone = false;
if (!cleanupRegistered) {
    cleanupRegistered = true;
    afterAll(async () => {
        if (cleanupDone) {
            return;
        }
        cleanupDone = true;
        try {
            db.close();
            await new Promise((resolve) => setTimeout(resolve, 1000)); // allow OS to release lock
            await unlink(databaseName);
        } catch (error) {
            if (error && typeof error === "object" && "code" in error && error.code !== 'ENOENT') {
                console.error("Root teardown failed:", error);
            }
        }
    });
}