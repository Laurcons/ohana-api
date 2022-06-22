import jwt from "jsonwebtoken";

function asyncWrapper(method: (...args: any) => void, ...args: any) {
    return new Promise<any>((res, rej) => {
        method(...args, (err: any, out: any) => {
            if (err)
                rej(err);
            res(out);
        });
    });
}

class JWTP {
    public sign(payload: string, secret: jwt.Secret, options?: jwt.SignOptions): Promise<string | undefined> {
        return asyncWrapper(jwt.sign, payload, secret, options);
    }
    public verify(token: string, secret: jwt.Secret, options?: jwt.VerifyOptions): Promise<jwt.JwtPayload | string> {
        return asyncWrapper(jwt.verify, token, secret, options);
    }
    public decode(token: string, options?: jwt.DecodeOptions): null | jwt.JwtPayload | string {
        return jwt.decode(token, options);
    }
};

export default new JWTP();