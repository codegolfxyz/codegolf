import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { HttpError, ErrorInfo, UnsupportedGrantType, InvalidClientError } from "./errors.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// The current secure key, and one or more previous keys to support key rotation
const keys = process.env.SECURE_KEY!.split(",").map(
    (hexKey) => Buffer.from(hexKey, "hex")
);

const newestKey = keys[0];
const previousKeys = keys.slice(1);

// Simple OAuth 2.0 Password Grant implementation
app.post("/token", (req, res) => {
    if (req.body.grant_type !== "password") {
        throw new UnsupportedGrantType(req.body.grant_type);
    }

    const username = req.body.username;
    const password = req.body.password;

    if (typeof username !== "string") {
        throw new InvalidClientError(`Invalid type for username: ${typeof username}.`);
    }

    if (typeof password !== "string") {
        throw new InvalidClientError(`Invalid type for password: ${typeof password}.`);
    }

    // TODO: Actually validate username and password.

    const role = "user"; // TODO: Support admin or other roles.

    const approximatelyOneDay = 86400;
    const now = Math.round(new Date().getTime() / 1000);
    const accessTokenExpiration = now + 30 * approximatelyOneDay;
    const accessToken = jwt.sign({type: "access", role: "role", exp: accessTokenExpiration}, newestKey);
    res.header("Cache-Control", "no-store"); // Note: Protocol requirement.
    res.send({
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: 30 * approximatelyOneDay,
        // refresh_token: refreshToken, // TODO: Support refresh tokens.
        scope: "user"
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof HttpError) {
        res.statusCode = err.status;
        res.header("Cache-Control", "no-store"); // Note: Protocol requirement.
        res.send(err.errorInfo);
    } else {
        res.statusCode = 500;
        res.header("Cache-Control", "no-store"); // Note: Protocol requirement.
        res.send(new ErrorInfo(
            "unknown_error",
            `An unknown error occurred: ${err.toString()}`
        ));
    }
});

export default app;
