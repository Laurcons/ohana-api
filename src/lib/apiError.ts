
export class ApiError extends Error {
    code: string;
    status: number;

    constructor(msg: string, code: string, status: number = 400) {
        super(msg);
        this.code = code;
        this.status = status;
    }
}

const ApiErrors = {
    auth: {
        loginCredentials(what: "user" | "pass") {
            if (process.env.NODE_ENV === "development")
                return new ApiError(`Login credentials are incorrect. (${what})`, "login-credentials");
            return new ApiError(`Login credentials are incorrect.`, "login-credentials");
        },
        userNotFound: () => new ApiError("User not found.", "user-not-found"),
        tokenIncorrect: () => new ApiError("Incorrect token. Restart your session?", "incorrect-token"),
        permissionDenied: () => new ApiError("Permission denied.", "permission-denied"),
        alreadyLoggedIn: () => new ApiError("Already logged in.", "already-logged-in"),
    }
};

export default ApiErrors;