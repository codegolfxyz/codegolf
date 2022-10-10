// An error that indicates the HTTP status code that should be returned.
export class HttpError extends Error {
    readonly status;

    constructor(code: string, status: number, msg: string) {
        super(msg);
        Object.setPrototypeOf(this, HttpError.prototype);
        this.status = status;
        this.name = code;
    }

    get errorInfo(): ErrorInfo {
        return new ErrorInfo(this.name, this.message);
    }
}

// A class that represents the OAuth error JSON response.
export class ErrorInfo {
    constructor(
        readonly error: string,
        readonly error_description: string,
        readonly error_uri?: string
    ) {}
}

// invalid_client – Client authentication failed, such as if the request contains
// an invalid client ID or secret. Send an HTTP 401 response in this case.
export class InvalidClientError extends HttpError {
    constructor(message: string) {
        super("invalid_client", 401, `Authentication failed. ${message}`);
        Object.setPrototypeOf(this, InvalidClientError.prototype);
    }
}

// invalid_grant – The authorization code (or user’s password for the password
// grant type) is invalid or expired. This is also the error you would return if
// the redirect URL given in the authorization grant does not match the URL
// provided in this access token request.
export class InvalidGrantError extends HttpError {
    constructor() {
        super("invalid_grant", 400, "Authentication failed. Authorization code or password is invalid or expired, or redirect URL does not match.");
        Object.setPrototypeOf(this, InvalidGrantError.prototype);
    }
}

// invalid_scope – For access token requests that include a scope (password or
// client_credentials grants), this error indicates an invalid scope value in the
// request.
export class InvalidScopeError extends HttpError {
    constructor(scope: string) {
        super("invalid_scope", 400, `Authentication failed. Invalid scope value '${scope}'.`);
        Object.setPrototypeOf(this, InvalidScopeError.prototype);
    }
}

// unauthorized_client – This client is not authorized to use the requested grant
// type. For example, if you restrict which applications can use the Implicit
// grant, you would return this error for the other apps.
export class UnauthorizedClientError extends HttpError {
    constructor(grantType: string) {
        super("unauthorized_client", 400, `Authentication failed. This client is not authorized to use the requested grant type, '${grantType}'.`);
        Object.setPrototypeOf(this, UnauthorizedClientError.prototype);
    }
}

// unsupported_grant_type – If a grant type is requested that the authorization
// server doesn’t recognize, use this code. Note that unknown grant types also use
// this specific error code rather than using the invalid_request above.
export class UnsupportedGrantType extends HttpError {
    constructor(grantType: string) {
        super("unsupported_grant_type", 400, `Authentication failed. Unsupported grant type '${grantType}' not recognized by this server.`);
        Object.setPrototypeOf(this, UnsupportedGrantType.prototype);
    }
}
