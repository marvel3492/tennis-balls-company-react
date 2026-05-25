/**
 * @typedef {import("express-session").Session & {
 *   customer_id?: number;
 *   cart?: CartType;
 *   custname?: string;
 *   isadmin?: number;
 * }} Session
 * @typedef {import("express").Request} ExpressRequest
 * @typedef {import("express").Response} ExpressResponse
 * @typedef {ExpressRequest & { session: Session }} ExpressSession
 * @typedef {import("express").NextFunction} NextFunction
 */