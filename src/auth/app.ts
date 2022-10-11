import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import { HttpError, ErrorInfo, UnsupportedGrantType, InvalidClientError } from "./errors.js";
import db from '../db/db.js';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// The current secure key, and one or more previous keys to support key rotation
const keys = process.env.SECURE_KEY!.split(",").map(
    (hexKey) => Buffer.from(hexKey, "hex")
);

const newestKey = keys[0];
const previousKeys = keys.slice(1);

// Simple OAuth 2.0 Password Grant implementation
router.post("/token", async (ctx, next) => {
    const body = ctx.request.body;

    if (typeof body === "undefined") {
        throw new UnsupportedGrantType("undefined");
    }

    if (body.grant_type !== "password") {
        throw new UnsupportedGrantType(`${body.grant_type}`);
    }

    const username = body.username;
    const password = body.password;

    if (typeof username !== "string") {
        throw new InvalidClientError(`Invalid type for username: ${typeof username}.`);
    }

    if (typeof password !== "string") {
        throw new InvalidClientError(`Invalid type for password: ${typeof password}.`);
    }

    const result = await db.query("SELECT * FROM users WHERE username=$1::text AND password=$2::text", [username, password]);

    if (result.rows.length < 1) {
        throw new InvalidClientError("Invalid username or password.");
    }

    const role = "user"; // TODO: Support admin or other roles.

    const approximatelyOneDay = 86400;
    const now = Math.round(new Date().getTime() / 1000);
    const accessTokenExpiration = now + 30 * approximatelyOneDay;
    const accessToken = jwt.sign({type: "access", role: role, exp: accessTokenExpiration}, newestKey);
    ctx.set("Cache-Control", "no-store"); // Note: Protocol requirement.
    ctx.body = {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: 30 * approximatelyOneDay,
        // refresh_token: refreshToken, // TODO: Support refresh tokens.
        scope: "user"
    };
});

async function errorHandler(ctx: Koa.DefaultContext, next: Koa.Next) {
    try {
        await next();
    } catch (err) {
        if (err instanceof HttpError) {
            ctx.statusCode = err.status;
            ctx.set("Cache-Control", "no-store"); // Note: Protocol requirement.
            ctx.body = err.errorInfo;
        } else {
            ctx.statusCode = 500;
            ctx.set("Cache-Control", "no-store"); // Note: Protocol requirement.
            ctx.body = new ErrorInfo(
                "unknown_error",
                `An unknown error occurred: ${err}`
            );
        }
    }
}

app
    .use(errorHandler)
    .use(router.routes())
    .use(router.allowedMethods());

export default app;
